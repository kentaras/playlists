import React, { Component } from 'react'
import '../../stylesheets/playlists.css'

class Playlists extends Component {
    constructor() {
        super()
        this.state = {
            url: 'https://api.spotify.com/v1/audio-analysis/6EJiVf7U0p1BBfs0qqeb1f',
            clientId: '8bdaab5d6d8a4c2eae42c9d6e0dc7db1'
        }
    }

    render() {
        return(
            <div className={'playlists'}>
                <div className={'playlist'}>
                    {/*<button onClick={() => this.renderPlaylist(this.state.url, this.state.userAccessToken)}>Playlists</button>*/}
                    <button className={'btn'} onClick={() => this.login(this.state.url, this.state.clientId)}>Login</button>
                </div>
            </div>
        )
    }
}

export default Playlists