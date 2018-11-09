import React, { Component } from 'react'
import '../../stylesheets/menu.css'
import { Link } from 'react-router-dom'

class MenuSideBar extends Component {

    render() {
        return(
            <div className={'menu ' + this.props.menu}>
                <ul className={'menuItems'}>
                    <Link to={'/createplaylist'}><li className={'menuItem'}> Create Playlist </li></Link>
                </ul>
            </div>
        )
    }
}

export default MenuSideBar