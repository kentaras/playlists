import React, { Component } from 'react'
import ViewPlaylists from './viewplaylists'

class SearchPlaylist extends Component {
    render() {
        return(
               this.props.playlists.filter(playlists => {
                return playlists.name.toLowerCase().includes(this.props.search.toLowerCase())
            }).map((playlist, i) => {
                return (
                    <div className={'playlistHolder'} key={i}>
                        <h2 className={'playlistName'}>{playlist.name}</h2>
                        <img alt={playlist.name} className={'playlistImage'} src={playlist.images[0].url}/>
                        {ViewPlaylists.getTracks(playlist)}
                    </div>
                )
            })
        )
    }
}

export default SearchPlaylist