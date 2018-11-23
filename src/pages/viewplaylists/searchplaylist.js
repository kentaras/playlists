import React, { Component } from 'react'
import ViewPlaylists from './viewplaylists'
import Loading from "../base/loading";
import api from "../../services/api"
import { Link } from 'react-router-dom'

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
        let playlists = await api.getPlaylistsData()
        console.log(playlists)
        this.setState({playlists: playlists.items, loading: false})
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
                            <Link to={'/playlist/'+playlist.id}><img alt={playlist.name} className={'playlistImage'} src={playlist.images[0].url}/></Link>
                            {/*{ViewPlaylists.getTracks(playlist)}*/}
                            <p>Total {playlist.tracks.total} tracks in this playlist</p>
                        </div>
                    )
                })
            )
        }
    }
}

export default SearchPlaylist