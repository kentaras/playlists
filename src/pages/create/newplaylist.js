import React, { Component } from 'react'

class NewPlaylist extends Component {
    constructor() {
        super()
        this.state = {
            playlistForDB: ''
        }
    }


    deleteFromPlaylist(e) {
        let playlistSongs = this.props.newSongs
        playlistSongs.splice(e.target.id, 1)
        this.setState({newSongs: playlistSongs})
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({playlistForDB: nextProps.newSongs})
    }

    render() {
        return(
            <div>
                <h5>Songs in playlist:</h5>
                {this.state.playlistForDB.length > 0 ?
                    <ol className={'no-margin no-padding'}>
                        {this.state.playlistForDB.map((song, i) => {
                            return (
                                <li key={i}
                                    className={'casual'}> {song.name} <button className={'remove'} onClick={(e) => this.deleteFromPlaylist(e)} id={i}>x</button></li>
                            )
                        })}
                    </ol> : ''
                }
            </div>
        )
    }
}

export default NewPlaylist