import React, { Component } from 'react'

class Main extends Component {

    getTracks(keys, i) {
        return(
            <ul style={{'padding' : '0'}} className={'playlistTrack'}>
                    {this.props.playlists.playlistNames[keys[i]].slice(0, 3).map((track, index) => {
                        return (
                            <li key={index} className={'firstLetterUppercase'}>{track[0].toLowerCase() + ' - ' + track[1]}</li>
                        )
                    })}
            </ul>
        )
    }

    render() {
        if (this.props.playlists.playlistNames) {
            const keys = Object.keys(this.props.playlists.playlistNames)
            return (
                <div className={'mainSection'}>
                    <div className={'playlistsHolder'}>
                        {this.props.playlists.playlistImages.map((image, i) => {
                            return(
                                <div className={'playlistHolder'} key={i}>
                                    <h2 className={'playlistName'}>{keys[i]}</h2>
                                    <img className={'playlistImage'} src={image.url}/>
                                    {this.getTracks(keys, i)}
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