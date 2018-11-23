import React, { Component } from 'react'
import ViewPlaylists from './viewplaylists'
import Loading from "../base/loading";
import mongo from '../../services/mongoservice'

class SearchPlaylist extends Component {
    constructor() {
        super()
        this.state = {
            playlists: ''
        }
    }

    componentWillMount() {
        this.renderSearchPlaylists()
    }

    // async renderSearchPlaylists() {
    //     this.setState({loading: true})
    //     let data = await api.getPlaylistsData()
    //     this.playlistsData = data.items
    //     // Make playlists have tracks inside
    //     await api.getTracksData().then(tracks => {
    //         tracks.forEach((playlistTracks, playlistIndex) => {
    //             this.playlistsData[playlistIndex].tracks = []
    //             playlistTracks.forEach(track => {
    //                 this.playlistsData[playlistIndex].tracks.push(track.track)
    //             })
    //         })
    //     })
    //     this.setState({playlists: this.playlistsData, loading: false})
    // }

    async renderSearchPlaylists() {
        this.setState({loading: true})
        let playlists = await mongo.getPlaylistBySearch(this.props.userId, this.props.search)
        this.setState({playlists: playlists, loading: false})
    }

    render() {
        if(this.state.loading) {
            return (<Loading/>)
        } else {
            return (
                this.state.playlists.filter(playlists => {
                    return playlists.name.toLowerCase().includes(this.props.search.toLowerCase())
                }).map((playlist, i) => {
                    return (
                        <div className={'playlistHolder'} key={i}>
                            <h2 className={'playlistName'}>{playlist.name}</h2>
                            <img alt={playlist.name} className={'playlistImage'} src={playlist.images[0].url}/>
                            {ViewPlaylists.getTracks(playlist)}
                        </div>
                    )
                })
            )
        }
    }
}

export default SearchPlaylist