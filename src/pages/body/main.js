import React, { Component } from 'react'
import Playlists from "../homepage/playlists";

class Main extends Component {
    constructor() {
        super()
        this.state = {
            state: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        const url = 'https://api.spotify.com/v1/audio-analysis/'
        fetch(url + nextProps.id, {
            headers: { 'Authorization': 'Bearer '+ nextProps.token}
        }).then(response => response.json())
            .then((data) => {
                console.log(data)
            })
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