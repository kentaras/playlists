import React, { Component } from 'react'
import Header from "../base/header";
import Main from "../base/main";
import Footer from "../base/footer";

class Create extends Component {
    constructor(){
        super()
        this.state = {
            searchRequest: ''
        }
    }

    searchText(e) {
        this.setState({searchRequest: e})
    }

    redirectAfterCreatingPlaylist(e) {
        this.props.history.push('/playlist/'+e)
    }

    render() {
        return(
            <div>
                <Header searchBar={false} searchWord={(e) => this.searchText(e)}/>
                <Main added={(e) => this.redirectAfterCreatingPlaylist(e)} page={'createPlaylist'}/>
                <Footer/>
            </div>
        )
    }
}

export default Create