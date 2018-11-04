import React, { Component } from 'react'

class Header extends Component {
    constructor() {
        super()
        this.state = {
            searchRequest: ''
        }
    }
    render() {
        if(this.props.name && this.props.image) {
            return(
                <div className={'header'}>
                    <input type={'text'} className={'searchBar'} placeholder={'Search'} onChange={(e) => this.props.searchText(e.target.value)} />
                    <h3 className={'userName'}>{this.props.name}</h3>
                    <img src={this.props.image} className={'userImg'} />
                </div>
            )
        }
        return(
            <div className={'header'}>
                Loading...
            </div>
        )
    }
}

export default Header