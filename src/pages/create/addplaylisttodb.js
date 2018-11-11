import React, { Component } from 'react'
import noImage from '../../images/no-image.png'
import api from '../../services/api'
import mongo from '../../services/mongoservice'

class AddPlaylistToDb extends Component {
    constructor() {
        super()
        this.state = {
            playlist: {
                name: '',
                image: '',
                owner: {
                    display_name: '',
                    href: '',
                    id: '',
                    type: 'user',
                    uri: ''
                },
                public: true,
                tracks: {},
                type: 'playlist',
            }
        }
    }

    async addToMongo() {
        const playlist = {}
        playlist.name = this.props.name
        if(this.props.tracks && this.props.tracks[0] && this.props.tracks[0].album && this.props.tracks[0].album.images && this.props.tracks[0].album.images[0] && this.props.tracks[0].album.images[0].url) {
            playlist.image = this.props.tracks[0].album.images[0].url
        } else {
            playlist.image = noImage
        }
        playlist.tracks = this.props.tracks
        playlist.public = true
        playlist.type = 'playlist'
        let userInfo = await api.getUserData()
        playlist.owner = userInfo
        mongo.addPlaylist(playlist)

    }

    render() {
        return(
            <button className={'btn addPlaylist'} onClick={() => this.addToMongo()}> Add Playlist </button>
        )
    }
}

export default AddPlaylistToDb