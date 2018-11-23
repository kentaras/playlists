import React, { Component } from 'react'
import api from '../../services/api'
import help from '../../services/helperfunctions'

class PlayerContext extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: ''
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.loaded) {
            this.getPlaylist()
        }
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

    getTrackLength(duration) {
        let durationSeconds = duration/1000
        let minutes = help.getDurationTime(durationSeconds, 'min')
        let seconds = help.getDurationTime(durationSeconds, 'sec')
        return (
            <p className={'duration'}>{minutes}:{seconds}</p>
        )
    }

    isPlaying(song) {
        let currentSongId = this.props.context.track_window.current_track.id
        if (song.track.id === currentSongId) {
            return 'songPlaying'
        }
    }

    render() {
        if (this.state.playlist) {
            return (
                <div>
                    <h3 className={'playerPlaylistName'}>You are listening to {this.state.playlist.name} playlist</h3>
                    <ul className={'songList'}>
                        {this.state.playlist.tracks.items.map((song, i) => {
                            return (
                                <li key={i} className={'songInList ' + this.isPlaying(song)} onClick={() => this.playSong(i)}>
                                    <img className={'buttonImage imgLeft'} src={song.track.album.images[0].url}/>
                                    {song.track.artists[0].name+' - '+song.track.name}
                                    {this.getTrackLength(song.track.duration_ms)}
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