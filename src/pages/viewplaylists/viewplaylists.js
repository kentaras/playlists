import React, { Component } from "react";
import { Link } from 'react-router-dom'
import '../../stylesheets/viewplaylists.css'
import '../../stylesheets/base.css'
import api from '../../services/api'
import SearchPlaylist from "./searchplaylist";
import Loading from "../base/loading";
import noPlaylistImage from '../../images/no-playlist-image.png'

class ViewPlaylists extends Component {

    constructor() {
        super()
        this.playlists = ''
        this.count = ''
        this.userId = ''
        this.state = {
            playlists: '',
            loading: true,
            playlistsPerPage: 6,
            playlistsTotal: '',
            playlistsInDB: true,
        }
    }

    componentWillMount() {
        this.renderPagePlaylists(this.props.currentPage)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.currentPage) {
            this.renderPagePlaylists(nextProps.currentPage)
        }
    }
    // PLAYLISTS FROM API
    async renderPagePlaylists(e = 1) {
        this.setState({loading: true})
        let data = await api.getPlaylistsData(this.state.playlistsPerPage, (e-1)*this.state.playlistsPerPage)
        let playlistsData = data.items
        // Make playlists have tracks inside
        await api.getTracksData(this.state.playlistsPerPage, this.state.playlistsPerPage*(e-1)).then(tracks => {
            tracks.forEach((playlistTracks, playlistIndex) => {
                playlistsData[playlistIndex].tracks = []
                playlistTracks.forEach(track => {
                    playlistsData[playlistIndex].tracks.push(track.track)
                })
            })
        })
        this.setState({playlistsTotal: data.total, playlists: playlistsData, loading: false})
    }

    // PLAYLISTS FROM MONGO DB
    // async renderPagePlaylists(e = 1) {
    //     this.setState({loading: true})
    //     let userData = await api.getUserData()
    //     this.userId = userData.id
    //     this.playlists = await mongo.getPlaylistsByUserId(this.userId, this.state.playlistsPerPage, e)
    //     this.count = await mongo.getUserPlaylistsCount(this.userId)
    //     this.setState({playlistsTotal: this.count, playlists: this.playlists, loading: false})
    // }

    static getTracks(playlist) {
        return(
            <ul style={{'padding' : '0'}} className={'playlistTrack'}>
                {playlist.tracks.slice(0,3).map((track, i) => {
                    return (
                        <li key={i} className={'firstLetterUppercase'}>{track.artists[0].name+' - ' + track.name}</li>
                    )
                })}
            </ul>
        )
    }

    // async updatePlaylists() {
    //     this.setState({updated: true})
    //     let data = await api.getPlaylistsData()
    //     let playlistsData = data.items
    //     // put in name for search (lowercase)
    //     playlistsData.forEach(playlist => {
    //         playlist.searchName = playlist.name.toLowerCase()
    //     })
    //     // Make playlists have tracks inside
    //     await api.getTracksData().then(tracks => {
    //         tracks.forEach((playlistTracks, playlistIndex) => {
    //             playlistsData[playlistIndex].tracks = []
    //             playlistTracks.forEach(track => {
    //                 playlistsData[playlistIndex].tracks.push(track.track)
    //             })
    //         })
    //     })
    //     this.insertPlaylists(playlistsData)
    // }

    // insertPlaylists(playlistsData) {
    //     playlistsData.forEach(playlist => {
    //         console.log(playlist)
    //         mongo.addPlaylist(playlist)
    //     })
    // }

    makePaginationControl() {
        let pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.playlistsTotal / this.state.playlistsPerPage); i++) {
            pageNumbers.push(i);
        }
        let pagesBefore = []
        let pagesAfter = []
        if(this.props.currentPage < 5) {
            pageNumbers = pageNumbers.splice(0, 5)
        } else if (this.props.currentPage > 5 && this.props.currentPage < pageNumbers.length-1) {
            pagesBefore = pageNumbers.slice(this.props.currentPage-3, this.props.currentPage)
            pagesAfter = pageNumbers.slice(this.props.currentPage, this.props.currentPage+2)
            pageNumbers = pagesBefore.concat(pagesAfter)
        } else if (this.props.currentPage > 6 && this.props.currentPage < pageNumbers.length - 3) {
            pagesBefore = pageNumbers.slice(this.props.currentPage-2, this.props.currentPage)
            pagesAfter = pageNumbers.splice(this.props.currentPage, 10)
            pageNumbers = pagesBefore.concat(pagesAfter)
        } else {
            pageNumbers = pageNumbers.splice(pageNumbers.length-5)
        }

        return (
            <ul className="pageNumbers-ul">
                {this.props.currentPage > 1 ? <Link className="pageNumbers" to={'/playlists/1'}><li className="pageNumbers" id={1}> &#8810; </li></Link> : ''}
                {pageNumbers.map(number => {
                    return(
                        <Link key={number}  to={'/playlists/'+number}><li className={'pageNumbers ' + this.isActive(number)} id={number} key={number}>{number}</li></Link>
                    )
                })}
                {this.props.currentPage < Math.ceil(this.state.playlistsTotal/this.state.playlistsPerPage) ? <Link className="pageNumbers" to={'/playlists/'+(Math.ceil(this.state.playlistsTotal/this.state.playlistsPerPage))}><li id={Math.ceil(this.state.playlistsTotal / this.state.playlistsPerPage)} className="pageNumbers"> &#8811; </li></Link> : '' }
            </ul>
        )
    }

    isActive(id) {
        return ((id === (parseInt(this.props.currentPage))) ? 'pageActive' : '')
    }

    render() {
        if(this.state.loading) {
            return (<Loading/>)
        } else {
            return (
                <div>
                    <div className={'playlistsHolder'}>
                        {this.props.search ?
                            <SearchPlaylist userId={this.userId} playlists={this.state.playlists} search={this.props.search}/>
                            :
                            this.state.playlists.map((playlist, i) => {
                                return (
                                    <div className={'playlistHolder'} key={i}>
                                        <h2 className={'playlistName'}>{playlist.name}</h2>
                                        <Link to={{pathname: `/playlist/${playlist.id}`}}>{playlist.images[0] ? <img alt={playlist.name} className={'playlistImage'} src={playlist.images[0].url}/> : <img alt={playlist.name} className={'playlistImage'} src={noPlaylistImage}/>}</Link>
                                        {ViewPlaylists.getTracks(playlist)}
                                    </div>
                                )
                            })
                        }
                    </div>
                    {this.makePaginationControl()}
                </div>
            )
        }
    }
}

export default ViewPlaylists