import React, { Component } from 'react'
import '../../stylesheets/createplaylist.css'
import api from '../../services/api'
import searchLoadImage from '../../images/searchloader.gif'


class CreatePlaylist extends Component {
    constructor(){
        super()
        this.songs = []
        this.state = {
            songs: '',
            searchLoading: false,
            predictiveSearch: ''
        }
    }

    async searchSongs(e) {
        if((e.target.value).length > 2) {
            this.setState({searchLoading: true})
            let songs = await api.searchSongs(e.target.value)
            this.setState({predictiveSearch: songs, searchLoading: false})
        } else {
            this.setState({searchLoading: false, predictiveSearch: ''})
        }
    }

    addSong(e) {
        if (!this.songs.includes(e.target.childNodes[0].wholeText) && (e.target.childNodes[0].wholeText !== undefined)) {
            this.songs.push(e.target.childNodes[0].wholeText)
        }
        this.setState({songs: this.songs})
    }

    deleteFromPlaylist(e) {
        let playlistSongs = this.state.songs
        playlistSongs.splice(e.target.id, 1)
        this.setState({songs: playlistSongs})
    }

    render() {
        console.log(this.state)
        return(
            <div>
                <div className={'songSearch'}>
                    <h5>Find A Song</h5>
                    <div className={'searchDiv'}>
                        <input className={'songSearchBar '} placeholder={'Enter song name'} onChange={(e) => this.searchSongs(e)} />
                        {this.state.predictiveSearch.tracks ?
                            <div className={'predictive'}>
                                {this.state.searchloading ? <img alt={'loading'} src={searchLoadImage}/> :
                                    <ul onClick={(e) => this.addSong(e)} className={'no-margin no-padding'}>
                                        {this.state.predictiveSearch.tracks.items.slice(0,5).map((song, i) => {
                                            return (
                                                <li key={i} className={'predictiveText'}> {song.artists[0].name +' - '+song.name}</li>
                                            )
                                        })}
                                    </ul>
                                }
                            </div>
                            :
                            ''
                        }
                    </div>
                </div>
                <div className={'newPlaylist'}>
                    <h5>Your new playlist</h5>
                    <input placeholder={'Enter playlist name'} className={'songSearchBar'} />
                    <div>
                        <h5>Songs in playlist:</h5>
                        {this.state.songs ?
                            <ol className={'no-margin no-padding'}>
                                {this.state.songs.map((song, i) => {
                                    return (
                                        <li key={i}
                                            className={'casual'}> {song} <button className={'remove'} onClick={(e) => this.deleteFromPlaylist(e)} id={i}>x</button></li>
                                    )
                                })}
                            </ol> : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default CreatePlaylist