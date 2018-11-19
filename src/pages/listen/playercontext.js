import React, { Component } from 'react'
import api from '../../services/api'
import Loading from "../base/loading";

class PlayerContext extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: ''
        }
    }

    async componentWillMount() {
        this.getPlaylist()
    }

    playSong(position) {
        api.playSong(this.props.context.context.uri, position)
    }

    async getPlaylist() {
        let playlistUri = this.props.context.context.uri
        let playlistId = playlistUri.split(':')
        playlistId = playlistId[playlistId.length-1]
        let playlist = await api.getPlaylistById(playlistId)
        this.setState({playlist: playlist, playlistUri: playlistUri})
    }


    render() {
        if (this.state.playlist) {
            return (
                <div>
                    <h3 className={'playerPlaylistName'}>You are listening to {this.state.playlist.name} playlist</h3>
                    <ul className={'songList'}>
                        {this.state.playlist.tracks.items.map((song, i) => {
                            // console.log(song)
                            return (
                                <li key={i} className={'songInList'} onClick={() => this.playSong(i)}>
                                    <img className={'buttonImage imgRight'} src={song.track.album.images[0].url}/>
                                    {song.track.artists[0].name+' - '+song.track.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )
        } else {
            return ''
        }
    }
}

export default PlayerContext