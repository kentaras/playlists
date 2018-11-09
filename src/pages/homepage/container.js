import React, { Component } from 'react';
import '../../stylesheets/base.css'
import Login from "./login";

class Container extends Component {
    constructor() {
        super()
        this.state = {
            login: true,
        }
    }

    render() {
        return (<Login/>)
    }
}

export default Container;
