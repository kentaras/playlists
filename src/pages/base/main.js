import React, { Component } from 'react'
import ViewPlaylists from "../viewplaylists/viewplaylists";

class Main extends Component {

    getContent() {
        if(this.props.page === 'homepage') {
            return <ViewPlaylists search={this.props.search}/>
        }
    }

    render() {
        return(
            <div className={'mainSection'}>
                {this.getContent()}
            </div>
        )
    }
}

export default Main