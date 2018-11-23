import React, { Component } from 'react'
import noImage from '../../images/no-image.png'
import api from '../../services/api'
import mongo from '../../services/mongoservice'

class AddPlaylistToDb extends Component {

    async insertToSpotify() {
        if(!this.props.name) {  // Check if name is entered
            window.alert('Enter playlist name!')
        } else { // Prepare data and post it to Spotify
            const playlist = {}
            playlist.name = this.props.name
            playlist.description = 'Test'
            playlist.colaborative = false
            playlist.public = true
            let userInfo = await api.getUserData()
            playlist.userId = userInfo.id
            let checkIfPlaylistAdded = await api.insertPlaylist(playlist)
            if (checkIfPlaylistAdded.status === 201 || checkIfPlaylistAdded.status === 200) {
                if (this.props.tracks.length > 0) {
                    this.addTracksToNewPlaylist()
                } else {
                    let playlistsData = await api.getPlaylistsData()
                    this.props.redirectId(playlistsData.items[0].id)
                }
            } else {
                console.log('error')
            }
        }
    }

    async addTracksToNewPlaylist() {
        const tracks = []
        this.props.tracks.forEach(track => {
            tracks.push(track.uri)
        })
        let playlistsData = await api.getPlaylistsData()
        let checkIfTracksAdded = await api.insertSongs(tracks, playlistsData.items[0].id)
        if(checkIfTracksAdded.status === 201 || checkIfTracksAdded === 200) {
            this.props.redirectId(playlistsData.items[0].id)
        } else {
            window.alert('Error adding tracks :(')
        }
    }

    render() {
        return(
            <button className={'btn addPlaylist'} onClick={() => this.insertToSpotify()}> Add Playlist </button>
        )
    }
}

export default AddPlaylistToDb