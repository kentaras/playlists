import React, { Component } from 'react'
import SearchBar from './searchbar'
import MenuSideBar from './menu'
import menuIcon from '../../images/menu.png'
import api from '../../services/api'

class Header extends Component {
    constructor() {
        super()
        this.state = {
            menuVisible: 'hidden',
            userName: '',
            userImage: ''
        }
    }

    async componentWillMount() {
        let userData = await api.getUserData()
        this.setState({userName: userData.display_name, userImage: userData.images[0].url})
    }

    getSearchReq(e) {
        this.props.searchWord(e)
    }

    toggleMenu() {
        if(this.state.menuVisible === 'visible') {
            this.setState({menuVisible: 'hidden'})
        } else {
            this.setState({menuVisible: 'visible'})
        }
    }

    render() {
        return(
            <div className={'header'}>
                <MenuSideBar menu={this.state.menuVisible}/>
                <img alt={'Menu'} onClick={(e) => this.toggleMenu(e)} className={'menuIcon'} src={menuIcon} />
                <SearchBar searchText={(e) => this.getSearchReq(e)}/>
                <div className={'userInfo'}>
                    <img alt={'User'} className={'userImg'} src={this.state.userImage}/>
                    <h3 className={'userName'}>{this.state.userName}</h3>
                </div>
            </div>
        )
    }
}

export default Header