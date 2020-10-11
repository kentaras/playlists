import React, { Component } from 'react'
import SearchBar from './searchbar'
import MenuSideBar from './menu'
import menuIcon from '../../images/menu.png'
import api from '../../services/api'
import loadImg from '../../images/searchloader.gif'
import Login from '../homepage/login'

class Header extends Component {
    constructor() {
        super()
        this.state = {
            menuVisible: 'hidden',
            userName: '',
            userImage: '',
            unauthorized: false
        }
    }

    async componentWillMount() {
        let userData = await api.getUserData()
        if (userData && userData.images && userData.images) {
            this.setState({ userName: userData.display_name, userImage: userData.images[0].url })
        } else {
            this.setState({ unauthorized: true })
        }
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
        if (this.state.unauthorized) {
            return <Login></Login>
        } else {
            return (
                <div className={'header'}>
                    <MenuSideBar menu={this.state.menuVisible}/>
                    <img alt={'Menu'} onClick={(e) => this.toggleMenu(e)} className={'menuIcon'} src={menuIcon}/>
                    {this.props.searchBar ? <SearchBar searchText={(e) => this.getSearchReq(e)}/> : ''}
                    {this.state.userName ?
                        <div className={'userInfo'}>
                            <img alt={'User'} className={'userImg'} src={this.state.userImage}/>
                            <h3 className={'userName'}>{this.state.userName}</h3>
                        </div>
                        :
                        <div className={'userInfo'}>
                            <img alt={'User'} className={'userImg'} src={loadImg}/>
                            <h3 className={'userName'}>Loading...</h3>
                        </div>
                    }
                </div>
            )
        }
    }
}

export default Header