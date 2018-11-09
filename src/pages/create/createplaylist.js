import React, { Component } from 'react'
import Header from "../base/header";
import Main from "../base/main";
import Footer from "../base/footer";

class CreatePlaylist extends Component {
    constructor(){
        super()
        this.state = {
            searchRequest: ''
        }
    }

    searchText(e) {
        this.setState({searchRequest: e})
    }



    render() {
        return(
            <div>
                <Header searchWord={(e) => this.searchText(e)}/>
                <Main/>
                <Footer/>
            </div>
        )
    }
}

export default CreatePlaylist