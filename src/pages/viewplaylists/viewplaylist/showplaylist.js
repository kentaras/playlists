import React, { Component } from 'react'
import Loading from "../../base/loading";
import PredictiveSearch from "../../create/predictivesearch";
import help from '../../../services/helperfunctions'
import api from '../../../services/api'
import editImg from '../../../images/edit.png'
import saveImg from '../../../images/save.png'
import { Link } from "react-router-dom";
import noPlaylistImage from '../../../images/no-playlist-image.png'

class ShowPlaylist extends Component {
    constructor() {
        super()
        this.state = {
            editName: false,
            playlist: ''
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({playlist: nextProps.playlistData})
    }

    getPlaylistName() {
        if(this.state.editName) {
            return(
                <div className={'nameDiv'}>
                    <input maxLength={100} type={'text'} onChange={(e) => this.setName(e.target.value)} className={'editPlaylistName'} defaultValue={this.state.playlist.name}/>
                    <img alt={'Change playlist name'} src={saveImg} onClick={() => this.editName()} className={'editImage'}/>
                </div>
            )
        } else {
            return (
                <div className={'nameDiv'}>
                    <h1 className={'viewPlaylistName'}>{this.state.playlist.name}</h1>
                    <img alt={'Edit playlist name'} src={editImg} onClick={() => this.editName()} className={'editImage'}/>
                </div>
            )
        }
    }

    setName(e) {
        let playlistObj = help.cloneArray(this.state.playlist)
        playlistObj.name = e
        this.setState({playlist: playlistObj})
    }

    editName() {
        if(this.state.editName) {
            api.changePlaylistName(this.state.playlist.id, this.state.playlist.name)
        }
        this.setState({editName: !this.state.editName})
    }

    removeSong(i) {
        let playlistObj = help.cloneArray(this.state.playlist)
        let trackUri = []
        trackUri.push({uri: playlistObj.tracks.items[i].track.uri, positions: [i]})
        api.removeTracks(playlistObj.id, trackUri)
        playlistObj.tracks.items.splice(i, 1)
        this.setState({playlist: playlistObj})
    }

    async addSong(song) {
        // console.log(this.state.playlist.tracks.items)
        let playlistObj = help.cloneArray(this.state.playlist)
        let songs = []
        songs.push(song.tracks.items[0].uri)
        let response = await api.insertSongs(songs, this.state.playlist.id)
        let playlistTracks = await api.getPlaylistTracksDataByURL(response.url)
        if (playlistTracks) {
            playlistObj.tracks.items.push(playlistTracks.items[(playlistTracks.total)-1])
            if(playlistObj.tracks.items[0]) {
                this.setState({playlist: playlistObj})
            } else {
                console.log('Error')
            }
        }

    }

    getPlaylistTracks() {
        if(this.state.playlist.tracks.items.length > 0) {
            return(
                this.state.playlist.tracks.items.map((track, i) => {
                    return(
                        <div key={i} className={'viewPlaylistTracks'}>
                        <li className={'viewPlaylistTrack'}>{track.track.artists[0].name + ' - ' + track.track.name}</li>
                        <button onClick={() => this.removeSong(i)} className={'removeTrack'}> X</button>
                        </div>
                    )
                })
            )
        } else {
            return(
                <div className={'viewPlaylistTracks'}>
                    <h2> This Playlist has no songs :(</h2>
                </div>)
        }
    }

    getListenButton() {
        if(this.state.playlist.tracks.items.length > 0) {
            return(
                <div>
                    {this.state.playlist.uri ? <Link to={'/listen/'+this.state.playlist.id}><h1 className={'btn shorterButton mainColor'}>LISTEN ON SPOTIFY</h1></Link> : ''}
                </div>
            )
        } else {
            return(
                <div>
                    {this.state.playlist.uri ? <h1 className={'btn shorterButton mainColor'}>Add songs to Listen on Spotify</h1> : ''}
                </div>
            )
        }
    }

    render() {
        if(this.state.playlist) {
            return (
                <div className={'playlistGrid'}>
                    <div className={'infoGrid'}>
                        {this.state.playlist.images[0] ? <img className={'viewPlaylistImage'} src={this.state.playlist.images[0].url} alt={this.state.playlist.name}/> : <img className={'viewPlaylistImage'} src={noPlaylistImage} alt={this.state.playlist.name + 'no Image'}/> }
                            {this.getPlaylistName()}
                        {this.getListenButton()}
                    </div>
                    <div>
                        <div className={'tracksGrid'}>
                            <h2 className={'mainColor'}> Add Songs </h2>
                            <p className={'mainColor'}> Click on a song in search and it will move to your playlist </p>
                            <PredictiveSearch foundSong={(e)=> this.addSong(e)} page={'edit'}/>
                        </div>
                        <ul className={'tracks-ul'}>
                            <p className={'mainColor'}> Press X next to a song to remove from list </p>
                            {this.getPlaylistTracks()}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return <Loading/>
        }
    }
}

export default ShowPlaylist