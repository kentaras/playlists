import React, { Component } from 'react'
import help from '../../services/helperfunctions'

class NewPlaylist extends Component {
    constructor() {
        super()
        this.tracks = []
        this.state = {
            prevProps: ''
        }
    }


    componentWillReceiveProps(nextProps, nextContext) {
        if(this.state.prevProps !== nextProps.newSongs) {
            nextProps.newSongs.forEach(track => {
                this.tracks.push(track)
            })
            this.props.takeTracks(this.tracks)
        }
        this.setState({prevProps: nextProps.newSongs})
    }

    deleteFromPlaylist(e) {
        let playlistSongs = this.tracks
        let sliced = playlistSongs.splice(e.target.id, 1)
        this.putBackToSongsFound(sliced)
        this.setState({newSongs: playlistSongs})
    }

    putBackToSongsFound(sliced) {
        let foundSongsClone = help.cloneArray(this.props.foundSongs)
        foundSongsClone.tracks.items.push(sliced[0])
        this.props.foundSongsChange(foundSongsClone)
    }

    render() {
        return(
            <div>
                <h5>Songs in playlist:</h5>
                <div className={'newPlaylistSongs'}>
                    {this.tracks.length > 0 ?
                        <ol className={'no-margin no-padding'}>
                            {this.tracks.map((song, i) => {
                                return (
                                    <li key={i} className={'casual'}>
                                        <p className={'songToAddName'}>{song.artists[0].name +' - '+song.name}</p>
                                        <button className={'remove'} onClick={(e) => this.deleteFromPlaylist(e)} id={i}>x</button>
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