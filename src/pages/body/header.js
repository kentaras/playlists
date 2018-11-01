import React, { Component } from 'react'

class Header extends Component {
    render() {
        return(
            <div className={'header'}>
                <nav>
                    <ul className={'links-ul'}>
                        <li className={'links'}><a href={'#1'}>Section 1</a></li>
                        <li className={'links'}><a href={'#2'}>Section 2</a></li>
                        <li className={'links'}><a href={'#3'}>Section 3</a></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Header