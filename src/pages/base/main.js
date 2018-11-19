import React, { Component } from 'react'
import ViewPlaylists from "../viewplaylists/viewplaylists";
import CreatePlaylist from "../create/createplaylist";
import ShowPlaylist from "../viewplaylists/viewplaylist/showplaylist";
import Player from "../listen/player";

class Main extends Component {

    getContent() {
        if(this.props.page === 'homepage') {
            return <ViewPlaylists currentPage={this.props.currentPage} search={this.props.search}/>
        } else if(this.props.page === 'createPlaylist') {
            return <CreatePlaylist search={this.props.search}/>
        } else if(this.props.page === 'playlist') {
            return <ShowPlaylist playlistData={this.props.playlistData}/>
        } else if(this.props.page === 'listen') {
            return(<Player playlistId={this.props.playlistId}/>)
        }
    }

    render() {
        return(
            <div className={'mainSection'}>
                {this.getContent()}
            </div>
        )
    }
}

export default Main