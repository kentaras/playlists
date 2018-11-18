import React, { Component } from 'react'
import api from '../../services/api'

class PlayerContext extends Component {
    componentWillMount() {
        console.log(this.props)
        this.getPlaylists()
    }

    playSong() {
        api.playSong('spotify:user:spotify:playlist:37i9dQZF1DXcF6B6QPhFDv', 1)
    }

    async getPlaylists() {
        let playlists = await api.getPlaylistsData()
        console.log(playlists)
    }


    render() {
        return(
            <div>

                <button onClick={() => this.playSong()}> Click </button>
            </div>
        )
    }
}

export default PlayerContext