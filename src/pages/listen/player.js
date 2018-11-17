import React, { Component } from 'react'
import api from '../../services/api'
import '../../stylesheets/listen.css'
import noImage from '../../images/no-image.png'

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
            playButtonValue: 'play',
            shuffle: false,
            repeat: 'off'
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
            this.playHere(this.state.deviceId)
            //TODO Don't let buttons work while playback is not transfered
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

    playerToggleShuffle() {
        this.setState({shuffle: !this.state.shuffle})
        api.shuffle(this.state.shuffle)
    }

    playerToggleRandom() {
        if(this.state.random === 'off') {
            this.setState({random: 'track'})
        } else if (this.state.random === 'track') {
            this.setState({random: 'context'})
        } else if (this.state.random === 'context') {
            this.setState({random: 'off'})
        }
        api.random(this.state.random)
    }

    playHere(device) { // Transfer playback from other device
        api.transferPlaybackHere(device)
    }

    render() {
        return(
            <div className={'playerWindow'}>
                <div className={'player'}>
                    <div>
                        <h5 className={'playerName'}> SUPER Player </h5>
                        <div className={'currentSong'}>
                            <p> Now Playing: </p>
                            <marquee> VERY SONG </marquee>
                            <p className={'trackTime'}>[00:00]</p>
                            <div className={'playerButtons'}>
                                <button className={'btn'} onClick={() => this.playerControl('play/pause')}>{this.state.playButtonValue}</button>
                                <button className={'btn'} onClick={() => this.playerControl('next')}> NEXT </button>
                                <button className={'btn'} onClick={() => this.playerControl('previous')}> PREVIOUS </button>
                                <button className={'btn'} onClick={() => this.playerToggleShuffle()}> shuffle </button>
                                <button className={'btn'} onClick={() => this.playerToggleRandom()}> random </button>
                            </div>
                        </div>
                    </div>
                    <div className={'songInfo'}>
                        <img src={noImage}/>
                        <p className={'songInfoText'}> Info about current song bla bla bla bla bla Info about current song bla bla bla bla bla Info about current song bla bla bla bla bla Info about current song bla bla bla bla bla Info about current song bla bla bla bla bla Info about current song bla bla bla bla bla</p>
                    </div>
                </div>
                <button className={'btn'} onClick={() => this.playerSeek(10)}> SEEK </button>
                <button className={'btn'} onClick={() => this.playerControl('getState')}> GET STATE</button>

                <button className={'btn'} onClick={() => this.playerGetVolume()}> GET VOLUME </button>
                <button className={'btn'} onClick={() => this.playerSetVolume(0.5)}> SET VOLUME </button>
            </div>
        )
    }
}

export default Player