import React, { Component } from "react";
import api from '../../services/api'
import loadImage from '../../images/loading.gif'

class ViewPlaylists extends Component {

    constructor() {
        super()
        this.state = {
            playlists: '',
            loading: true
        }
    }

    async componentWillMount() {
        let playlistsData = await api.getPlaylistsData()
        // Make playlists have tracks inside
        await api.getTracksData().then(tracks => {
            tracks.forEach((playlistTracks, playlistIndex) => {
                playlistsData[playlistIndex].tracks = []
                playlistTracks.forEach(track => {
                    playlistsData[playlistIndex].tracks.push(track.track)
                })
            })
        })
        this.setState({playlists: playlistsData, loading: false})
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

    render() {
        if(this.state.loading) {
            return(
                <div>
                    <img alt={'Loading'} src={loadImage}/>
                    <h1> Collecting data... </h1>
                </div>
            )
        } else {
            console.log(this.props)
            return (
                <div className={'playlistsHolder'}>
                    {this.props.search ?
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
                </div>
            )
        }
    }
}

export default ViewPlaylists