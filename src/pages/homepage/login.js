import React, { Component } from 'react';
import '../../stylesheets/login.css'

class Login extends Component {

    login() {
        window.location = 'http://localhost:8888/login'
        console.log(window.location)
    }

    render() {
        return(
            <div>
                <button onClick={() => this.login()} className={'btn-login login'}>Login with Spotify</button>
            </div>
        )
    }
}

export default Login;
