import React, { Component } from 'react'
import '../../../stylesheets/playlistinfo.css'
import Header from "../../base/header";
import Main from "../../base/main";
import Footer from "../../base/footer";
import Error from "../../error";
import mongo from "../../../services/mongoservice"
import api from "../../../services/api"

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
        // FOR MONGO DB
        // let playlistData = await mongo.getPlaylistDataById(playlistId)
        let playlistData = await api.getPlaylistById(playlistId)
        playlistData.tracks = await api.getPlaylistTracksData(playlistData)
        console.log(playlistData)
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