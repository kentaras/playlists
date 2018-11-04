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
        this.userName = ''
        this.userImage = ''
        this.state = {
            login: true,
            userName: '',
            userImage: '',
            playlistData: {},
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
                    playlistsDataVar.playlistImages.push(playlist.images[0])
                    playlistsDataVar.playlistNames[playlist.name] = []
                    playlist.trackDatas.map(trackData => {
                        playlistsDataVar.playlistNames[playlist.name].push([trackData.track.artists[0].name, trackData.track.name])
                    })
                })
                this.setState({playlistData: playlistsDataVar})
            })
            // let urlQuery = queryString.parse(window.location.search)
            // let accessToken = urlQuery.access_token
            // const url = 'https://api.spotify.com/v1/'
            // const playListDataVar = {
            //     playlistNames: [],
            //     playlistImages: [],
            //     trackNames: [],
            //     artistNames: []
            // }
            // let userName = ''
            // let userImage = ''
            // fetch(url+'me', {
            //     headers: { 'Authorization': 'Bearer '+ accessToken}
            // }).then(response => response.json())
            // .then((userData) => {
            //     // // this.setState({
            //     // //     userName: userData.display_name,
            //     // //     userImage: userData.images[0].url,
            //     // })
            //     userName = userData.display_name
            //     userImage = userData.images[0].url
            //     fetch(url +'users/' + userData.id + '/playlists', {
            //         headers: { 'Authorization': 'Bearer '+ accessToken }
            //     }).then(response => response.json())
            //         .then(playlistData => {
            //             playlistData.items.map((playlist) => {
            //                 playListDataVar.playlistNames[playlist.name] = []
            //                 playListDataVar.playlistImages.push(playlist.images[0])
            //                 fetch(playlist.tracks.href, {
            //                     headers: { 'Authorization': 'Bearer '+ accessToken }
            //                 }).then(response => response.json())
            //                     .then(tracks => {
            //                         tracks.items.forEach(track => {
            //                             playListDataVar.playlistNames[playlist.name].push(track.track.name)
            //                             track.track.artists.forEach(artist => {
            //                                 playListDataVar.artistNames.push(artist.name)
            //                                 this.setState({playlistData: playListDataVar, userName: userName, userImage: userImage})
            //                             })
            //                         })
            //                     })
            //             })
            //         })
            // })
        }
    }

    // searchText(e) {
    //     let playlistsNames = this.state.playlistData.playlistNames
    //     let loweredNames = Object.keys(playlistsNames)
    //     let searchResult = loweredNames.filter(name => name.toLowerCase().includes(e.toLowerCase()))
    //     this.setState({playlistData: {playlistNames: searchResult}})
    // }

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
