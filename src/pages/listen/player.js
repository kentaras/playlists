import React, { Component } from 'react'
import api from '../../services/api'
import '../../stylesheets/listen.css'
import '../../../node_modules/react-input-range/lib/css/index.css'
import noImage from '../../images/no-image.png'
import playButton from '../../images/play.png'
import pauseButton from '../../images/pause.png'
import shuffleButtonOff from '../../images/shuffle.png'
import shuffleButtonOn from '../../images/shuffleOn.png'
import arrowDownImg from '../../images/arow-down.png'
import arrowUpImg from '../../images/arrow-up.png'
import nextButton from '../../images/next.png'
import previousButton from '../../images/previous.png'
import InputRange from 'react-input-range'
// import repeatOffButton from '../../images/repeatOff.png'
// import repeatAllButton from '../../images/repeatAll.png'
// import repeatOneButton from '../../images/repeatOne.png'
import Loading from "../base/loading";
import VolumeControl from "./volumecontrol";
import PlayerContext from "./playercontext";
import help from '../../services/helperfunctions'
import InputSlider from 'react-input-slider'

class Player extends Component {
    constructor(props) {
        super(props);
        this.id = ''
        this.player = ''
        this.interval = ''
        this.checkDeviceInterval = ''
        this.accessToken = localStorage.getItem('access_token')
        this.state = {
            deviceId: '',
            player: '',
            pauseButtonValue: true,
            shuffle: false,
            repeat: 'off',
            currentSong: '',
            position: '',
            inputRangeValue: '',
            rangeStep: '',
            trackMinutes: '',
            trackSeconds: '',
            trackImage: '',
            trackAlbum: '',
            volume: '',
            loading: true,
            showContext: '',
            context: '',
            linkedFromPlaylist: false,
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.checkForPlayer(), 1000)
    }

    componentWillUnmount() {
        if(this.interval) {
            clearInterval(this.interval)
        }
        if(this.player) {
            this.player.disconnect()
        }
    }

    checkForPlayer() {
        if (window.Spotify !== null) {
            this.player = new window.Spotify.Player({
                name: "Saulius Player",
                getOAuthToken: cb => {
                    cb(this.accessToken);
                },
            });
            this.player.connect();
            clearInterval(this.interval);
            this.createEventHandlers();
        }
    }

    createEventHandlers() {
        this.player.on('initialization_error', e => {
            console.error(e);
        });
        this.player.on('authentication_error', e => {
            console.error(e);
        });
        this.player.on('account_error', e => {
            console.error(e);
        });
        this.player.on('playback_error', e => {
            console.error(e);
        });

        // Playback status updates
        this.player.on('player_state_changed', state => {
            if (state) {
                clearInterval(this.interval)
                let trackState = (state.track_window.current_track)
                let currentSong = (trackState.artists[0].name + ' - ' + trackState.name)
                if (state.paused === false) {
                    this.interval = setInterval(() => this.player.getCurrentState().then(state => (this.setPositionAndTime(state))), 1000)
                }
                let value = Math.floor(state.position / (parseInt(state.duration / 100)))
                this.setState({
                    currentSong: currentSong,
                    shuffle: state.shuffle,
                    pauseButtonValue: state.paused,
                    inputRangeValue: value,
                    rangeStep: state.duration / 100,
                    trackImage: state.track_window.current_track.album.images[0].url,
                    trackAlbum: state.track_window.current_track.album.name,
                    context: state
                })
            }

        });

        // Ready
        this.player.on('ready', async data => {
            let {device_id} = data;
            // console.log("Let the music play on!");
            this.playerGetVolume()
            this.setState({deviceId: device_id});
            this.playHere(this.state.deviceId)
        });
    }

    playerControl(action) {
        switch (action) {
            case('play/pause'):
                this.player.togglePlay()
                break
            case('next'):
                this.player.nextTrack()
                break
            case('previous'):
                this.player.previousTrack()
                break
            default:
        }
    }

    playerGetVolume() {
        this.player.getVolume().then(volume => {
            this.setState({volume: volume})
        })
    }

    playerSetVolume(vol) {
        this.player.setVolume(vol).then(() => {
            console.log('Volume is now ' + Math.floor(vol * 100) + '%')
            this.setState({volume: vol})
        })
    }

    async playHere(device) { // Transfer playback from other device
        await api.transferPlaybackHere(device)
        this.checkDeviceInterval = setInterval(() => this.checkIfActive(), 1000)
    }

    async checkIfActive() {
        let deviceId = await api.getDeviceId()
        if(deviceId.devices[0].is_active) {
            if(this.props.playlistId && !this.state.linkedFromPlaylist) {
                api.playSong('spotify:user:1197275119:playlist:'+this.props.playlistId, 0)
                this.setState({linkedFromPlaylist: true})
            }
            clearInterval(this.checkDeviceInterval)
            this.setState({loading: false})
        }
    }

    getPlayButtonValue() {
        if(this.state.pauseButtonValue) {
            return <img alt={'Play'} className={'buttonImage'} src={playButton}/>
        } else {
            return <img alt={'Pause'} className={'buttonImage'} src={pauseButton}/>
        }
    }

    playerToggleShuffle() {
        api.shuffle(!this.state.shuffle)
        this.setState({shuffle: !this.state.shuffle})
    }

    getShuffleButtonValue() {
        if (this.state.shuffle) {
            return <img alt={'Turn off shuffle'} className={'buttonImage'} src={shuffleButtonOn}/>
        } else {
            return <img alt={'Turn on shuffle'} className={'buttonImage'} src={shuffleButtonOff}/>
        }
    }

    setPositionAndTime(state) {
        let positionSeconds = parseInt(state.position / 1000)
        let minutes = help.getDurationTime(positionSeconds, 'min')
        let seconds = help.getDurationTime(positionSeconds, 'sec')
        this.setState({
            trackMinutes: minutes,
            trackSeconds: seconds,
            inputRangeValue: state.position / (parseInt(state.duration / 100))
        })
    }



    changePosition(value) {
        let newPosition = this.state.rangeStep*value
        this.player.seek(newPosition)
        this.setState({inputRangeValue: newPosition})
    }

    togglePlayerContext() {
        if(this.state.showContext) {
            this.setState({showContext: ''})
        } else {
            this.setState({showContext: 'show'})
        }
    }

    getArrowButtonValue() {
        if(this.state.showContext) {
            return <img alt={'Hide'} className={'buttonImage arrowImg'} src={arrowUpImg} />
        } else {
            return <img alt={'Show'} className={'buttonImage arrowImg'} src={arrowDownImg} />
        }
    }

    // async getCurrentSongName() {
    //     if(this.state.deviceId) {
    //         let currentSong = await this.player.getCurrentState()
    //         console.log(currentSong)
    //     }
    // }

    // playerToggleRepeat() {
    //     this.player.repeat()
    //     if(this.state.repeat === 'off') {
    //         this.setState({repeat: 'track'})
    //     } else if (this.state.repeat === 'track') {
    //         this.setState({repeat: 'context'})
    //     } else if (this.state.repeat === 'context') {
    //         this.setState({repeat: 'off'})
    //     }
    //     api.repeat(this.state.repeat)
    //     console.log(this.state.repeat)
    // }
    //
    // getRepeatButtonValue() {
    //     if(this.state.repeat === 'off') {
    //         return <img className={'buttonImage'} src={repeatOffButton}/>
    //     } else if(this.state.repeat === 'track') {
    //         return <img className={'buttonImage'} src={repeatOneButton}/>
    //     } else if(this.state.repeat === 'context') {
    //         return <img className={'buttonImage'} src={repeatAllButton}/>
    //     }
    // }

    render() {
        if(this.state.loading) {
            return(
                <div className={'player nogrid'}>
                    <div> <Loading player={true}/> </div>
                </div>
            )
        } else {

            return (
                <div className={'playerWindow'}>
                    <div className={'player'}>
                        <div>
                            <div className={'currentSong'}>
                                <p> Now Playing: </p>
                                <h3>{this.state.currentSong}</h3>
                                {this.state.trackSeconds ? <p className={'trackTime'}>{this.state.trackMinutes + ' : ' + this.state.trackSeconds}</p> : <p className={'trackTime'}> 00 : 00 </p>}
                                <div className={'playerButtons'}>
                                    <button className={'playerButton'}
                                            onClick={() => this.playerControl('previous')}>
                                        <img alt={'Play previous'} src={previousButton} className={'buttonImage'}/></button>
                                    <button className={'playerButton'}
                                            onClick={() => this.playerControl('play/pause')}>{this.getPlayButtonValue()}</button>
                                    <button className={'playerButton'} onClick={() => this.playerControl('next')}>
                                        <img alt={'Play next'}
                                            src={nextButton} className={'buttonImage'}/></button>
                                    <button className={'playerButton'}
                                            onClick={() => this.playerToggleShuffle()}> {this.getShuffleButtonValue()} </button>
                                    {/*<button className={'playerButton'} onClick={() => this.playerToggleRepeat()}> {this.getRepeatButtonValue()} </button>*/}
                                </div>
                                <div className={'slider'}>
                                    <input
                                        id="sliderInput"
                                        type="range"
                                        min="0" max="100"
                                        value={this.state.inputRangeValue}
                                        onChange={(e) => this.changePosition(e.target.value)}
                                        step="1"/>
                                </div>
                            </div>
                        </div>
                        <div className={'songInfo'}>
                            {!this.state.trackImage ? <img alt={'Empty'} src={noImage}/> : <img alt={'Album'} src={this.state.trackImage}/>}
                            <p className={'songInfoText'}> {this.state.trackAlbum}</p>
                            <VolumeControl volume={this.state.volume} changeVolume={(e) => this.playerSetVolume(e)}/>
                            <button className={'playerButton arrow'} onClick={() => this.togglePlayerContext()}>{this.getArrowButtonValue()}</button>
                        </div>
                    </div>
                    <div className={'player player-playlists '+this.state.showContext}>
                        <PlayerContext currentSong={this.state.currentSong} loaded={!this.state.loading} deviceId={this.state.deviceId} context={this.state.context}/>
                    </div>
                </div>
            )
        }
    }
}

export default Player