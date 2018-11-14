import React, { Component } from 'react'
import Loading from "../../base/loading";

class ShowPlaylist extends Component {
    render() {
        if(this.props.playlistData) {
            return (
                <div>
                    {this.props.playlistData.map((playlistObj, i) => {
                    console.log(playlistObj)
                        return(
                            <div key={i} className={'playlistGrid'}>
                                <div className={'infoGrid'}>
                                    <h1>{playlistObj.name}</h1>
                                    <img className={'playlistImage'} src={playlistObj.images[0].url} alt={playlistObj.name}/>
                                    <a href={playlistObj.uri}> LISTEN ON SPOTIFY </a>
                                </div>
                                <div className={'tracksGrid'}>
                                    <h2 className={'playlistName'}>Songs:</h2>
                                    <ul className={'playlistTracks'}>
                                        {playlistObj.tracks.map((track, i) => {
                                            return( <li className={'playlistTrack'} key={i}>{track.artists[0].name +' - '+track.name}</li> )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return <Loading/>
        }
    }
}

export default ShowPlaylist