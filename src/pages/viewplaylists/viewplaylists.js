import React, { Component } from "react";
import '../../stylesheets/viewplaylists.css'
import '../../stylesheets/base.css'
import loadImage from '../../images/loading.gif'
import SearchPlaylist from "./searchplaylist";
import api from '../../services/api'
import mongo from '../../services/mongoservice'
import { Link } from 'react-router-dom'

class ViewPlaylists extends Component {

    constructor() {
        super()
        this.state = {
            playlists: '',
            loading: true,
            playlistsPerPage: 3,
            playlistsTotal: '',
            playlistsInDB: true
        }
    }

    componentWillMount() {
        //TODO Soak playlists to DB when login first time
        // mongo.checkIfPlaylistsInDb()
        this.renderPagePlaylists(this.props.currentPage)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.currentPage) {
            this.renderPagePlaylists(nextProps.currentPage)
        }
    }

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

    postPlaylist() {
        console.log(this.state.playlists[0])
        // mongo.addPlaylist(this.state.playlists[0])
        //TODO onClick Playlist show more info about it and let edit
    }

    makePaginationControl() {
        let pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.playlistsTotal / this.state.playlistsPerPage); i++) {
            pageNumbers.push(i);
        }
        let pagesBefore = []
        let pagesAfter = []
        if(this.props.currentPage < 4) {
            pageNumbers = pageNumbers.splice(0, 5)
        } else if (this.props.currentPage > 3 && this.props.currentPage < pageNumbers.length-1) {
            pagesBefore = pageNumbers.slice(this.props.currentPage-3, this.props.currentPage)
            pagesAfter = pageNumbers.slice(this.props.currentPage, this.props.currentPage+2)
            pageNumbers = pagesBefore.concat(pagesAfter)
        } else if (this.props.currentPage > 3 && this.props.currentPage < pageNumbers.length - 3) {
            pagesBefore = pageNumbers.slice(this.props.currentPage-2, this.props.currentPage)
            pagesAfter = pageNumbers.splice(this.props.currentPage, 10)
            pageNumbers = pagesBefore.concat(pagesAfter)
        } else {
            pageNumbers = pageNumbers.splice(pageNumbers.length-5)
        }

        return (
            <ul className="pageNumbers-ul">
                <Link className="pageNumbers" to={'/playlists/1'}><li className="pageNumbers" id={1}> &#8810; </li></Link>
                {pageNumbers.map(number => {
                    return(
                        <Link key={number}  to={'/playlists/'+number}><li className={'pageNumbers ' + this.isActive(number)} id={number} key={number}>{number}</li></Link>
                    )
                })}
                <Link className="pageNumbers" to={'/playlists/'+(Math.ceil(this.state.playlistsTotal/this.state.playlistsPerPage))}><li id={Math.ceil(this.state.playlistsTotal / this.state.playlistsPerPage)} className="pageNumbers"> &#8811; </li></Link>
            </ul>
        )
    }

    isActive(id) {
        return ((id === (parseInt(this.props.currentPage))) ? 'pageActive' : '')
    }

    render() {
        if(this.state.loading) {
            return(
                <div>
                    <img alt={'Loading'} src={loadImage}/>
                    <h1> Collecting data... </h1>
                </div>
            )
        } else {
            return (
                <div>
                    <div className={'playlistsHolder'}>
                        {this.props.search ?
                            <SearchPlaylist playlists={this.state.playlists} search={this.props.search}/>
                            :
                            this.state.playlists.map((playlist, i) => {
                                return (
                                    <div className={'playlistHolder'} key={i}>
                                        <h2 className={'playlistName'}>{playlist.name}</h2>
                                        <img alt={playlist.name} className={'playlistImage'} src={playlist.images[0].url}/>
                                        {ViewPlaylists.getTracks(playlist)}
                                    </div>
                                )
                            })}
                        <button className={'btn'} onClick={() => this.postPlaylist()}> Try </button>
                    </div>
                    {this.makePaginationControl()}
                </div>
            )
        }
    }
}

export default ViewPlaylists