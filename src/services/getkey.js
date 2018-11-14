import React, { Component } from 'react'
import loadGif from '../images/loader.gif'
import queryString from "query-string";
import Error from "../pages/error";
import help from "./helperfunctions";
import mongo from "./mongoservice";

class GetKey extends Component {

    componentWillMount() {
        let urlQuery = queryString.parse(window.location.search)
        let accessToken = urlQuery.access_token
        if(accessToken) {
            let toStorage = accessToken
            localStorage.setItem('access_token', toStorage)
            this.setState({ error: false })
        } else {
            this.setState({error: true})
        }
    }

    componentDidMount() {
        this.props.history.push('/playlists')
    }

    render() {
        if (!this.state.error) {
            return (
                <div>
                    <img alt={'Loading'} className={'loadPage'} src={loadGif}/>
                </div>
            )
        } else {
            return(
                <Error/>
            )
        }
    }
}

export default GetKey