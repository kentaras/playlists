import React, { Component } from 'react'
import loadImage from '../../images/loading.gif'
import playerLoader from '../../images/playerLoader.gif'

class Loading extends Component {
    render() {
        return(
            <div className={'loader'}>
                {this.props.player ? <img className={'playerLoader'} alt={'Loading'} src={playerLoader}/> : <img alt={'Loading'} src={loadImage}/>}
                <h1> Collecting data... </h1>
            </div>
        )
    }
}

export default Loading