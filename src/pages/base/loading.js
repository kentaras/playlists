import React, { Component } from 'react'
import loadImage from '../../images/loading.gif'

class Loading extends Component {
    render() {
        return(
            <div className={'loader'}>
                <img alt={'Loading'} src={loadImage}/>
                <h1> Collecting data... </h1>
            </div>
        )
    }
}

export default Loading