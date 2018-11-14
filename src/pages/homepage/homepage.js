import React, { Component } from 'react'
import Header from "../base/header";
import Main from "../base/main";
import Footer from "../base/footer";
import api from "../../services/api";
import mongo from "../../services/mongoservice";

class Homepage extends Component {
    constructor() {
        super()
        this.state = {
            searchRequest: '',
            currentPage: '',
            userData: ''
        }
    }

    componentWillMount() {
        let page = (this.props && this.props.match && this.props.match.params && this.props.match.params.page) || (this.props && this.props.match && this.props.match && this.props.match.path) || '';
        if (page) {
            if (page === '/playlists') {
                page = 1
                this.props.history.push('/playlists/1')
                this.setState({currentPage: 1})
            } else {
                this.setState({currentPage: page})
            }
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.match.params.page) {
            this.setState({currentPage: nextProps.match.params.page})
        }
    }

    searchPlaylist(e) {
        this.setState({searchRequest: e})
    }

    render() {
        return(
            <div>
                <Header searchBar={true} searchWord={(e) => this.searchPlaylist(e)}/>
                <Main search={this.state.searchRequest} currentPage={this.state.currentPage} page={'homepage'}/>
                <Footer/>
            </div>
        )
    }
}

export default Homepage