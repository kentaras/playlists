import React, { Component } from 'react'
import '../../stylesheets/createplaylist.css'
import '../../stylesheets/scrollbar.css'
import SongsFound from "./songsfound";
import NewPlaylist from "./newplaylist";
import PredictiveSearch from "./predictivesearch";
import AddPlaylistToDb from "./addplaylisttodb";


class CreatePlaylist extends Component {
    constructor(){
        super()
        this.state = {
            newSongs: '',
            predictiveSearch: '',
            foundSongs: ''
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
                        <h5>Your new playlist name</h5>
                        <input placeholder={'Enter playlist name'} className={'songSearchBar'} />
                    </div>
                    <div>
                        <SongsFound newSongs={(e) => this.setState({newSongs: e})}
                                    foundSongsChange={(e) => this.setState({foundSongs: e})}
                                    foundSongs={this.state.foundSongs}/>
                    </div>
                        <NewPlaylist newSongs={this.state.newSongs}
                                     foundSongsChange={(e) => this.setState({foundSongs: e})}
                                     foundSongs={this.state.foundSongs}/>
                </div>
                <AddPlaylistToDb/>
            </div>
        )
    }
}

export default CreatePlaylist