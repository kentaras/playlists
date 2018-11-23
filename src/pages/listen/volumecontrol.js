import React, { Component } from 'react'
import volUpDisableImg from '../../images/volume-up-disabled.png'
import volUpImg from '../../images/volume-up.png'
import volDownDisableImg from '../../images/volume-down-disabled.png'
import volDownImg from '../../images/volume-down.png'


class VolumeControl extends Component {

    getVolUpButton() {
        if(this.props.volume < 1) {
            return(<img alt={'volume'} className={'buttonImage'} src={volUpImg}/>)
        } else {
            return(<img alt={'volume'} className={'buttonImage'} src={volUpDisableImg}/>)
        }
    }

    getVolDownButton() {
        if(this.props.volume > 0.09) {
            return(<img alt={'volume'} className={'buttonImage'} src={volDownImg}/>)
        } else {
            return(<img alt={'volume'} className={'buttonImage'} src={volDownDisableImg}/>)
        }
    }

    volControl(action) {
        if(action === '+') {
            if(this.props.volume < 1) {
                this.props.changeVolume((this.props.volume+0.1))
            }
        } else {
            if(this.props.volume > 0.09) {
                this.props.changeVolume((this.props.volume-0.1))
            }
        }
    }

    render() {
        return(
            <div>
                <button className={'playerButton'} onClick={() => this.volControl('-')}> {this.getVolDownButton()} </button>
                <button className={'playerButton'} onClick={() => this.volControl('+')}> {this.getVolUpButton()} </button>
                <p>Volume is {Math.floor(this.props.volume * 100)} %</p>
            </div>
        )
    }
}

export default VolumeControl