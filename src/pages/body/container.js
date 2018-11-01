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
        this.state = {
            login: true,
            userName: '',
            userImage: '',
            userId: '',
            token: ''
        }
    }

    componentWillMount() {
        let callback = ((this.props && this.props.match && this.props.match.path) || '')
        if (callback === '/callback') {
            this.setState({login: false})
            let urlQuery = queryString.parse(window.location.search)
            let accessToken = urlQuery.access_token
            const url = 'https://api.spotify.com/v1/me'
            fetch(url, {
                headers: { 'Authorization': 'Bearer '+ accessToken}
            }).then(response => response.json())
                .then((data) => {
                    console.log(data)
                    this.setState({userName: data.display_name, userImage: data.images[0].url, userId: data.id, token: accessToken})
                })
        }

    }

    render() {
        if(this.state.login) {
            return (<Login/>)
        } else {
            return (
                <div className="App">
                    <Header name={this.state.userName} image={this.state.userImage}/>
                    <Main id={this.state.userId} token={this.state.token}/>
                    <Footer/>
                </div>
            );
        }
    }
}

export default Container;
