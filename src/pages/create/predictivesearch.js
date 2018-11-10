import React, { Component } from 'react'
import searchLoadImage from "../../images/searchloader.gif";
import api from "../../services/api";
import CreatePlaylist from "./createplaylist";

class PredictiveSearch extends Component {
    constructor() {
        super()
        this.state = {
            predictiveSearch: ''
        }
    }

    async getSongs(e) {
        if(e.key === 'Enter') {
            let songs = await api.searchSongs(e.target.value, 50)
            this.props.foundSongs(songs)
            this.setState({ predictiveSearch: ''})
        }
    }

    async getSongsFromSearch(songName) {
        let songs = await api.searchSongs(songName, 50)
        this.props.foundSongs(songs)
        this.setState({ predictiveSearch: ''})
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
                <h5>Find A Song</h5>
                <input className={'songSearchBar '} placeholder={'Enter song name'} onKeyPress={(e) => this.getSongs(e)} onChange={(e) => this.searchSongs(e)} />
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