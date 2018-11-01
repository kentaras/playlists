import React, { Component } from 'react'
import Playlists from "../homepage/playlists";

class Main extends Component {
    render() {
        return(
            <div className={'mainSection'}>
                <Playlists/>
            </div>
        )
    }
}

export default Main