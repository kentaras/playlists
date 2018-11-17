import React, { Component } from 'react'
import noImage from '../../images/no-image.png'
import api from '../../services/api'
import mongo from '../../services/mongoservice'

class AddPlaylistToDb extends Component {

    async addToMongo() {
        //TODO Redirect/Clear fields after save to DB
        const playlist = {}
        let userInfo = await api.getUserData()
        let date = new Date()
        let ms = date.getTime()
        if(!this.props.name) {  // Check if name is entered
            window.alert('Enter playlist name!')
        } else if (!this.props.tracks) { // Check if tracks are added
            window.alert('Playlist must contain at least 1 song!')
        } else { // Prepare data and post it to mongo
            playlist.name = this.props.name
            if (this.props.tracks && this.props.tracks[0] && this.props.tracks[0].album && this.props.tracks[0].album.images && this.props.tracks[0].album.images[0]) {
                playlist.images = this.props.tracks[0].album.images
            } else {
                playlist.images = noImage
            }
            playlist.tracks = this.props.tracks
            playlist.public = true
            playlist.type = 'playlist'
            playlist.owner = userInfo
            playlist.id = String(ms)
            playlist.searchName = this.props.name.toLowerCase()
            mongo.addPlaylist(playlist, userInfo.id)
        }
    }

    render() {
        return(
            <button className={'btn addPlaylist'} onClick={() => this.addToMongo()}> Add Playlist </button>
        )
    }
}

export default AddPlaylistToDb