import React, { Component } from 'react'
import SearchPlaylist from '../search/searchplaylist'

class Header extends Component {
    constructor() {
        super()
        this.state = {
            searchRequest: ''
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {

    }

    getSearchReq(e) {
        this.props.searchWord(e)
    }

    render() {
        if(this.props.name && this.props.image) {
            return(
                <div className={'header'}>
                    <SearchPlaylist searchText={(e) => this.getSearchReq(e)}/>
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