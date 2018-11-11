import React, { Component } from 'react'
import help from '../../services/helperfunctions'

class SongsFound extends Component {
    constructor() {
        super()
        this.songsToAdd = []
        this.state = {
            active: [],
            songsToAdd: []
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.songsToAdd = []
        this.resetActive()
    }

    resetActive() {
        if(this.props && this.props.foundSongs && this.props.foundSongs.tracks && this.props.foundSongs.tracks.items && this.props.foundSongs.tracks.items.length)
        for(let i=0; i<this.props.foundSongs.tracks.items.length; i++) {
            document.getElementById('song-'+i).setAttribute('class', 'songsToAdd')
        }
    }

    isActive(e) {
        let active = document.getElementById(e)
        if (!active) { // Remove all highlights if added to newPlaylist
            this.resetActive()
        } else if (active.className === 'songsToAdd') { // Highlight if selected
            let idArray = e.split('-')
            let index = idArray[1]
            active.setAttribute('class', 'songsToAdd active')
            this.songsToAdd.push(this.props.foundSongs.tracks.items[index])
        } else {    //Remove highlight if unselected
            let idArray = e.split('-')
            let index = idArray[1]
            active.setAttribute('class', 'songsToAdd')
            this.songsToAdd.forEach((name, i) => {
                if(name.name === this.props.foundSongs.tracks.items[index].name) {
                    this.songsToAdd.splice(i, 1)
                }
            })
        }
        this.setState({songsToAdd: this.songsToAdd})
    }

    addSongs(e) {
        this.props.newSongs(e)
        this.setState({songsToAdd: ''})
        this.isActive(100)
        this.removeFromFound(e) // Remove from SongsFound If added to newPlaylist
    }

    removeFromFound(e) {
        let foundSongs = help.cloneArray(this.props.foundSongs)
        for(let i=0; i<e.length; i++) {
            foundSongs.tracks.items.map((item, index) => {
                if (item.name === e[i].name) {
                    foundSongs.tracks.items.splice(index, 1)
                }
            })
        }
        console.log(foundSongs.tracks.items.length)
        this.props.foundSongsChange(foundSongs)
    }

    render() {
        if(this.props.foundSongs) {
            return (
                <div>
                    <h5> Select songs you want to add to playlist </h5>
                    <div className={'songsHolder'}>
                        <ul className={'no-margin no-padding'}>
                            {this.props.foundSongs.tracks.items.map((item, i) => {
                                return (
                                    <li key={i} id={'song-'+i} className={"songsToAdd"} onClick={(e) => this.isActive(e.target.id)}> {item.artists[0].name + ' - ' + item.name} </li>
                                )
                            })}
                        </ul>
                    </div>
                    <button className={'addToPlaylist'} onClick={() => this.addSongs(this.state.songsToAdd)}>Add songs</button>
                </div>
            )
        } else {
            return ''
        }
    }
}

export default SongsFound