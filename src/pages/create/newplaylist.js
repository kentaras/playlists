import React, { Component } from 'react'
import help from '../../services/helperfunctions'

class NewPlaylist extends Component {
    constructor() {
        super()
        this.state = {
            playlistForDB: ''
        }
    }


    deleteFromPlaylist(e) {
        let playlistSongs = this.props.newSongs
        let sliced = playlistSongs.splice(e.target.id, 1)
        this.putBackToSongsFound(sliced)
        this.setState({newSongs: playlistSongs})
    }

    putBackToSongsFound(sliced) {
        let foundSongsClone = help.cloneArray(this.props.foundSongs)
        foundSongsClone.tracks.items.push(sliced[0])
        this.props.foundSongsChange(foundSongsClone)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({playlistForDB: nextProps.newSongs})
    }

    render() {
        return(
            <div>
                <h5>Songs in playlist:</h5>
                <div className={'newPlaylistSongs'}>
                    {this.state.playlistForDB.length > 0 ?
                        <ol className={'no-margin no-padding'}>
                            {this.state.playlistForDB.map((song, i) => {
                                return (
                                    <li key={i} className={'casual'}>
                                        <p className={'songToAddName'}>{song.artists[0].name +' - '+song.name}</p>
                                        <button className={'btn remove'} onClick={(e) => this.deleteFromPlaylist(e)} id={i}>x</button>
                                        <hr className={'hr'}/>
                                    </li>
                                )
                            })}
                        </ol> : ''
                    }
                </div>
            </div>
        )
    }
}

export default NewPlaylist