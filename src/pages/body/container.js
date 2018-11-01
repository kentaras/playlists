import React, { Component } from 'react';
import Header from "./header";
import Main from "./main";
import Footer from "./footer";
import '../../stylesheets/body.css'

class Container extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Main/>
                <Footer/>
            </div>
        );
    }
}

export default Container;
