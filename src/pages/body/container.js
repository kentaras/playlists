import React, { Component } from 'react';
import Header from "./header";
import Main from "./main";
import Footer from "./footer";
import '../../stylesheets/body.css'
import Login from "./login";

class Container extends Component {
    constructor() {
        super()
        this.state = {
            login: true,
        }
    }

    componentWillMount() {
        let callback = ((this.props && this.props.match && this.props.match.path) || '')
        if (callback === '/callback') {
            this.setState({login: false})
        }
    }

    render() {
        if(this.state.login) {
            return (<Login/>)
        } else {
            return (
                <div className="App">
                    <Header/>
                    <Main/>
                    <Footer/>
                </div>
            );
        }
    }
}

export default Container;
