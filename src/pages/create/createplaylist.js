import React, { Component } from 'react'
import '../../stylesheets/createplaylist.css'
import '../../stylesheets/scrollbar.css'
import api from '../../services/api'
import searchLoadImage from '../../images/searchloader.gif'
import SongsFound from "./songsfound";
import NewPlaylist from "./newplaylist";
import PredictiveSearch from "./predictivesearch";


class CreatePlaylist extends Component {
    constructor(){
        super()
        this.state = {
            newSongs: '',
            predictiveSearch: '',
            foundSongs: '',
            selectedSong: 'selectedSong'
        }
    }

    render() {
        return(
            <div>
                <div className={'songSearch'}>
                    <div>
                        <PredictiveSearch foundSongs={(e) => this.setState({foundSongs: e})}/>
                    </div>
                    <div className={'newPlaylist'}>
                        <h5>Your new playlist</h5>
                        <input placeholder={'Enter playlist name'} className={'songSearchBar'} />
                    </div>
                    <div>
                        <SongsFound newSongs={(e) => this.setState({newSongs: e})} foundSongs={this.state.foundSongs}/>
                    </div>
                        <NewPlaylist newSongs={this.state.newSongs}/>
                </div>
            </div>
        )
    }
}

export default CreatePlaylist