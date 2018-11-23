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
            foundSongs: '',
            playlistName: '',
            tracksToDb: '',
            playlistDescription: ''
        }
    }

    takeTracks(e) {
        this.setState({tracksToDb: e})
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
                        <input maxLength={100} onChange={(e) => this.setState({playlistName: e.target.value})} placeholder={'Enter playlist name'} className={'songSearchBar'} />
                    </div>
                    <div>
                        <SongsFound newSongs={(e) => this.setState({newSongs: e})}
                                    foundSongsChange={(e) => this.setState({foundSongs: e})}
                                    foundSongs={this.state.foundSongs}/>
                    </div>
                        <NewPlaylist newSongs={this.state.newSongs}
                                     foundSongsChange={(e) => this.setState({foundSongs: e})}
                                     foundSongs={this.state.foundSongs}
                                     takeTracks={(e) => this.takeTracks(e)}/>
                </div>
                <AddPlaylistToDb redirectId={(e) => this.props.passPlaylistId(e)} name={this.state.playlistName} tracks={this.state.tracksToDb}/>
            </div>
        )
    }
}

export default CreatePlaylist