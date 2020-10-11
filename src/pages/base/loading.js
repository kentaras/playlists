import React, { Component } from 'react'
import loadImage from '../../images/loading.gif'
import playerLoader from '../../images/playerLoader.gif'
import loginLoader from '../../images/loader.gif'

class Loading extends Component {
    render() {
        if(this.props.page === 'login') {
            return (
                <div className={'loader'}>
                    <img className={'loaderImage'} alt={'Loading'} src={loginLoader}/>
                </div>
            )
        } else {
            return(
                <div className={'loader'}>
                    {this.props.player ? <img className={'playerLoader'} alt={'Loading'} src={playerLoader}/> : <img className={'loaderImage'} alt={'Loading'} src={loadImage}/>}
                </div>
            )
        }
    }
}

export default Loading