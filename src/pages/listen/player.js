import React, { Component } from 'react'
import api from '../../services/api'
import '../../stylesheets/listen.css'


class Player extends Component {
    constructor(props) {
        super(props);
        this.id = ''
        this.player = ''
        this.interval = ''
        this.accessToken = localStorage.getItem('access_token')
        this.state = {
            deviceId: '',
            player: '',
            playButtonValue: 'play'
        }
    }

    componentDidMount () {
        this.interval = setInterval(() => this.checkForPlayer(), 1000)
    }

    checkForPlayer() {
        if (window.Spotify !== null) {
            this.player = new window.Spotify.Player({
                name: "Saulius Playlist",
                getOAuthToken: cb => { cb(this.accessToken); },
            });
            this.player.connect();
            clearInterval(this.interval);
            this.createEventHandlers();
        }
    }

    createEventHandlers() {
        this.player.on('initialization_error', e => { console.error(e); });
        this.player.on('authentication_error', e => {
            console.error(e);
            this.setState({ loggedIn: false });
        });
        this.player.on('account_error', e => { console.error(e); });
        this.player.on('playback_error', e => { console.error(e); });

        // Playback status updates
        this.player.on('player_state_changed', state => {
            console.log(state);
            if(state) {
                if(state.paused) {
                    this.setState({playButtonValue: 'play'})
                } else {
                    this.setState({playButtonValue: 'pause'})
                }
            }
        });

        // Ready
        this.player.on('ready', data => {
            let { device_id } = data;
            console.log("Let the music play on!");
            this.setState({ deviceId: device_id });
        });
    }

    playerControl(action) {
        switch(action) {
            case('play/pause'):
                this.player.togglePlay()
                break
            case('next'):
                this.player.nextTrack()
                break
            case('previous'):
                this.player.previousTrack()
                break
            case('getState'):
                this.player.getCurrentState().then(state => console.log(state))
                break
            default:
                console.log('Default')
        }

    }

    playerSeek(pos) { // Change playback position
        this.player.seek(pos*1000)
    }

    playerGetVolume() {
        this.player.getVolume().then(volume => {
            let volume_percentage = volume * 100;
            console.log(`The volume of the player is ${volume_percentage}%`);
        });
    }

    playerSetVolume(vol) {
        this.player.setVolume(vol).then(() => {
            console.log('Volume is now '+(vol*100)+'%')
        })
    }


    render() {
        return(
            <div className={'playerWindow'}>
                <button onClick={() => this.playerSeek(10)}> SEEK </button>
                <button onClick={() => this.playerControl('play/pause')}>{this.state.playButtonValue}</button>
                <button onClick={() => this.playerControl('getState')}> GET STATE</button>
                <button onClick={() => this.playerControl('next')}> NEXT </button>
                <button onClick={() => this.playerControl('previous')}> PREVIOUS </button>
                <button onClick={() => this.playerGetVolume()}> GET VOLUME</button>
                <button onClick={() => this.playerSetVolume(0.5)}> SET VOLUME</button>
            </div>
        )
    }
}

export default Player