import React, { Component } from 'react'

class Search extends Component {
    render() {
        return(
            <input type={'text'} className={'searchBar'} placeholder={'Search'} onChange={(e) => this.props.searchText(e.target.value)} />
        )
    }
}

export default Search