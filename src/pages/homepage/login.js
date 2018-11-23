import React, { Component } from 'react';
import '../../stylesheets/login.css'

class Login extends Component {

    login() {
        window.location = 'http://localhost:8888/login'
    }

    render() {
        return(
            <div className={'loginPage'}>
                <button onClick={() => this.login()} className={'btn-login login'}>Login with Spotify</button>
            </div>
        )
    }
}

export default Login;
