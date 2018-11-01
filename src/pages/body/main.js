import React, { Component } from 'react'
import Playlists from "../homepage/playlists";
import queryString from 'query-string'

class Main extends Component {
    componentWillMount() {
        let urlQuery = queryString.parse(window.location.search)
        console.log(urlQuery.access_token)
    }
    render() {
        return(
            <div className={'mainSection'}>
                <Playlists/>
            </div>
        )
    }
}

export default Main