import React, { Component } from 'react'
import api from "../../services/api";

class PredictiveSearch extends Component {
    constructor() {
        super()
        this.state = {
            predictiveSearch: ''
        }
    }

    async getSongs(e) {
        if(e.key === 'Enter' && this.props.page !== 'edit') {
            let songs = await api.searchSongs(e.target.value, 50)
            this.props.foundSongs(songs)
            this.setState({predictiveSearch: ''})
        }
    }

    async getSongsFromSearch(songName) {
        if(this.props.page !== 'edit') {
            let songs = await api.searchSongs(songName, 50)
            this.props.foundSongs(songs)
            this.setState({predictiveSearch: ''})
        } else {
            let song = await api.searchSongs(songName, 1)
            this.props.foundSong(song)
            this.setState({predictiveSearch: ''})
        }
    }

    async searchSongs(e) {
        if((e.target.value).length > 2) {
            let songs = await api.searchSongs(e.target.value)
            this.setState({predictiveSearch: songs})
        } else {
            this.setState({predictiveSearch: ''})
        }
    }

    render() {
        return(
            <div className={'searchDiv'}>
                {!this.props.page ? <h5>Find A Song</h5> : ''}
                <input className={'songSearchBar '} placeholder={'Enter song name or artist'} onKeyPress={(e) => this.getSongs(e)} onChange={(e) => this.searchSongs(e)} />
                {this.state.predictiveSearch ?
                    <div className={'predictive'}>
                        <ul className={'no-margin no-padding'}>
                            {this.state.predictiveSearch.tracks.items.slice(0, 5).map((song, i) => {
                                return (
                                    <li key={i}
                                        onClick={() => this.getSongsFromSearch(song.name)}
                                        className={'predictiveText'}>
                                        {song.artists[0].name + ' - ' + song.name}
                                    </li>
                                )
                            })}
                        </ul>
                    </div> : ''
                }
            </div>
        )
    }
}

export default PredictiveSearch