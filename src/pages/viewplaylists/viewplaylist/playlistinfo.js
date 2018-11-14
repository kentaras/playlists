import React, { Component } from 'react'
import '../../../stylesheets/playlistinfo.css'
import Header from "../../base/header";
import Main from "../../base/main";
import Footer from "../../base/footer";
import mongo from "../../../services/mongoservice"
import Error from "../../error";

class PlaylistInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: ''
        }
    }

    componentWillMount() {
        let playlistId = (this.props && this.props.match && this.props.match.params && this.props.match.params.id || '')
        if(playlistId) {
            this.getPlaylistData(playlistId)
        } else {
            return <Error/>
        }
    }

    async getPlaylistData(playlistId) {
        let playlistData = await mongo.getPlaylistDataById(playlistId)
        this.setState({playlist: playlistData})
    }

    render() {
        return(
            <div>
                <Header/>
                <Main page={'playlist'} playlistData={this.state.playlist}/>
                <Footer/>
            </div>
        )
    }
}

export default PlaylistInfo