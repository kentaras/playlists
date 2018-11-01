import React, { Component } from 'react'

class Header extends Component {
    render() {
        if(this.props.name && this.props.image) {
            return(
                <div className={'header'}>
                    <img src={this.props.image} className={'userImg'} />
                    <h3 className={'userName'}>{this.props.name}</h3>
                </div>
            )
        }
        return(
            <div className={'header'}>

            </div>
        )
    }
}

export default Header