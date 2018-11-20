import React, { Component } from 'react'
import Loading from "../../base/loading";
import PredictiveSearch from "../../create/predictivesearch";
import help from '../../../services/helperfunctions'
import mongo from '../../../services/mongoservice'
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
                    <input type={'text'} onChange={(e) => this.setName(e.target.value)} className={'editPlaylistName'} defaultValue={this.state.playlist.name}/>
                    <img src={saveImg} onClick={() => this.editName()} className={'editImage'}/>
                </div>
            )
        } else {
            return (
                <div className={'nameDiv'}>
                    <h1 className={'viewPlaylistName'}>{this.state.playlist.name}</h1>
                    <img src={editImg} onClick={() => this.editName()} className={'editImage'}/>
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
        this.setState({editName: !this.state.editName})
    }

    removeSong(i) {
        let playlistObj = help.cloneArray(this.state.playlist)
        playlistObj.tracks.splice(i, 1)
        this.setState({playlist: playlistObj})
    }

    addSong(song) {
        let playlistObj = help.cloneArray(this.state.playlist)
        // console.log(song.tracks.items[0], playlistObj.tracks[0])
        playlistObj.tracks.push(song.tracks.items[0])
        this.setState({playlist: playlistObj})
    }

    updatePlaylist() {
        mongo.addPlaylist(this.state.playlist)
    }

    //TODO make EDIT PLAYLIST work from API

    getPlaylistTracks() {
        console.log(this.state.playlist.tracks.items.length)
        if(this.state.playlist.tracks.items.length > 0) {
            return(
                this.state.playlist.tracks.items.map((track, i) => {
                    return(
                        <div key={i} className={'viewPlaylistTracks'}>
                        <li className={'playlistTrack'}>{track.track.artists[0].name + ' - ' + track.track.name}</li>
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

    render() {
        if(this.state.playlist) {
            return (
                <div className={'playlistGrid'}>
                    <div className={'infoGrid'}>
                        {this.state.playlist.images[0] ? <img className={'viewPlaylistImage'} src={this.state.playlist.images[0].url} alt={this.state.playlist.name}/> : <img className={'viewPlaylistImage'} src={noPlaylistImage} alt={this.state.playlist.name + 'no Image'}/> }
                            {this.getPlaylistName()}
                        {this.state.playlist.uri ? <Link to={'/listen/'+this.state.playlist.id}> LISTEN ON SPOTIFY </Link> : ''}
                    </div>
                    <div>
                        <div className={'tracksGrid'}>
                            <h2> Add Songs </h2>
                            <p> Click on a song in search and it will move to your playlist </p>
                            <PredictiveSearch foundSong={(e)=> this.addSong(e)} page={'edit'}/>
                        </div>
                        <ul className={'tracks-ul'}>
                            <p> Press X next to a song to remove from list </p>
                            {this.getPlaylistTracks()}
                        </ul>
                        <button className={'btn'} onClick={() => this.updatePlaylist()}> Save changes </button>
                    </div>
                </div>
            )
        } else {
            return <Loading/>
        }
    }
}

export default ShowPlaylist