import React, { Component } from 'react'
import queryString from "query-string";
import Error from "../pages/error";
import Loading from "../pages/base/loading";

class GetKey extends Component {
    constructor(props) {
        super(props);
        this.interval = ''
        this.state = {
            error: ''
        }
    }


    async componentWillMount() {
        let urlQuery = queryString.parse(window.location.search)
        let accessToken = urlQuery.access_token
        if(accessToken) {
            localStorage.setItem('access_token', accessToken)
            this.setState({ error: false })
        } else {
            this.setState({error: true})
        }
    }

    componentDidMount() {
            window.location.href = '/playlists'
    }

    render() {
        if (!this.state.error) {
            return (
                <div className={'loginPage'}>
                    <Loading page={'login'}/>
                </div>
            )
        } else {
            return(
                <Error/>
            )
        }
    }
}

export default GetKey