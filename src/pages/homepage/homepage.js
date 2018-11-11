import React, { Component } from 'react'
import Header from "../base/header";
import Main from "../base/main";
import Footer from "../base/footer";

class Homepage extends Component {
    constructor() {
        super()
        this.state = {
            searchRequest: ''
        }
    }

    searchPlaylist(e) {
        this.setState({searchRequest: e})
    }

    render() {
        return(
            <div>
                <Header searchBar={true} searchWord={(e) => this.searchPlaylist(e)}/>
                <Main search={this.state.searchRequest} page={'homepage'}/>
                <Footer/>
            </div>
        )
    }
}

export default Homepage