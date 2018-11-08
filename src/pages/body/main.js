import React, { Component } from 'react'

class Main extends Component {

    getTracks(playlist) {
            return(
            <ul style={{'padding' : '0'}} className={'playlistTrack'}>
                {playlist.trackNames.slice(0,3).map((track, i) => {
                    return (
                            <li key={i} className={'firstLetterUppercase'}>{playlist.artistNames[i]+' - ' + track}</li>
                        )
                })}
            </ul>
        )
    }

    render() {
        if (this.props.playlists) {
            return (
                <div className={'mainSection'}>
                    <div className={'playlistsHolder'}>
                        {this.props.search ?
                            this.props.playlists.filter(playlists => {
                                return playlists.name.toLowerCase().includes(this.props.search.toLowerCase())
                            }).map((playlist, i) => {
                                return(
                                    <div className={'playlistHolder'} key={i}>
                                        <h2 className={'playlistName'}>{playlist.name}</h2>
                                        <img className={'playlistImage'} src={playlist.image}/>
                                        {this.getTracks(playlist)}
                                    </div>
                                )
                            })
                            :
                            this.props.playlists.map((playlist, i) => {
                            return(
                                <div className={'playlistHolder'} key={i}>
                                    <h2 className={'playlistName'}>{playlist.name}</h2>
                                    <img className={'playlistImage'} src={playlist.image}/>
                                    {this.getTracks(playlist)}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        } else {
            return(
                <div className={'mainSection'}>
                    Loading
                </div>
            )
        }
    }
}

export default Main