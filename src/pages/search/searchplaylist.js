import React, { Component } from 'react'

class SearchPlaylist extends Component {
    render() {
        return(
            <input type={'text'} className={'searchBar'} placeholder={'Search'} onChange={(e) => this.props.searchText(e.target.value)} />
        )
    }
}

export default SearchPlaylist