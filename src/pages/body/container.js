import React, { Component } from 'react';
import Header from "./header";
import Main from "./main";
import Footer from "./footer";
import '../../stylesheets/body.css'
import Login from "./login";
import queryString from "query-string";

class Container extends Component {
    constructor() {
        super()
        this.playlist = []
        this.state = {
            login: true,
            userName: '',
            userImage: '',
            playlistData: [],
            searchRequest: ''
        }
    }

    componentDidMount() {
            let urlQuery = queryString.parse(window.location.search)
            let accessToken = urlQuery.access_token
            if(accessToken) {
                this.setState({login: false})
            const url = 'https://api.spotify.com/v1/'
            const playlistsDataVar = {
                playlistNames: [],
                playlistImages: [],
                onlyPlaylistNames: []
            }

            fetch(url + 'me', {
                headers: {'Authorization': 'Bearer ' + accessToken}
            }).then(response => response.json())
                .then((userData) => {
                    this.setState({userName: userData.display_name, userImage: userData.images[0].url})
                    let firstData = fetch(url + 'me/playlists', {
                        headers: {'Authorization': 'Bearer ' + accessToken}
                    })
                        let firstDataPromise = firstData
                            .then(response => response.json())
                            return firstDataPromise
                        .then(playlistData => {
                            let playlists = playlistData.items
                            let trackDataPromises = playlists.map(playlist => {
                                let responsePromise = fetch(playlist.tracks.href, {
                                    headers: { 'Authorization': 'Bearer '+ accessToken }
                                })
                                let trackDataPromise = responsePromise
                                    .then(response => response.json())
                                return trackDataPromise
                            })
                            let allTracksData = Promise.all(trackDataPromises)
                            let playlistsPromise = allTracksData.then(trackDatas => {
                                trackDatas.forEach((trackData, i) => {
                                    playlists[i].trackDatas = trackData.items
                                })
                                return playlists
                            })
                            return playlistsPromise
                        })
                }).then((playlistsArray) => {
                playlistsArray.map((playlist) => {
                    let listPlay = {}
                    listPlay.name = playlist.name
                    listPlay.image = playlist.images[0].url
                    listPlay.trackNames = []
                    listPlay.artistNames = []
                    playlist.trackDatas.map(trackData => {
                        listPlay.trackNames.push(trackData.track.name)
                        listPlay.artistNames.push(trackData.track.artists[0].name)
                    })
                    this.playlist.push(listPlay)
                })
                this.setState({playlistData: this.playlist})
            })
        }
    }

    searchText(e) {
        this.state.playlistData.filter(name => {
            this.state.playlistData.name.toLowerCase().includes(e.toLowerCase())
        })
        this.setState({})
    }

    render() {
        if(this.state.login) {
            return (<Login/>)
        } else {
            return (
                <div className="container">
                    <Header name={this.state.userName} image={this.state.userImage} searchText={(e) => this.searchText(e)}/>
                    <Main playlists={this.state.playlistData} search={this.state.searchRequest}/>
                    <Footer/>
                </div>
            )
        }
    }
}

export default Container;
