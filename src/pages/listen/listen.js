import React, { Component } from 'react'
import Header from "../base/header";
import Main from "../base/main";
import Footer from "../base/footer";

class Listen extends Component {
    render() {
        return(
            <div>
                <Header searchBar={false}/>
                <Main page={'listen'}/>
                <Footer/>
            </div>
        )
    }
}

export default Listen