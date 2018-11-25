import React, { Component } from 'react';
import '../../stylesheets/login.css'
import Loading from "../base/loading";
import loadGif from "../../images/loader.gif";

class Login extends Component {

    componentWillMount() {
        let location = window.location.hostname
        if(location === 'localhost') {
            window.location = 'http://localhost:8888/login'
        } else {
            window.location = 'https://playlists-and-player-backend.herokuapp.com/login'
        }
    }

    render() {
        return(
            <div className={'loginPage'}>
                {/*<button onClick={() => this.login()} className={'btn login'}>Login with Spotify</button>*/}
                <Loading page={'login'}/>
            </div>
        )
    }
}

export default Login;
