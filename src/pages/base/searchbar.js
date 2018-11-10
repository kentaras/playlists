import React, { Component } from 'react'
import '../../stylesheets/searchbar.css'

class SearchBar extends Component {
    render() {
        return(
            <input type={'text'} className={'searchBar'} placeholder={'Search'} onChange={(e) => this.props.searchText(e.target.value)} />
        )
    }
}

export default SearchBar