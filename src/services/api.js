export default class {

    static url = 'https://api.spotify.com/v1/'
    static playlistsDataVar = {
        playlistNames: [],
        playlistImages: [],
        onlyPlaylistNames: []
    }
    static accessToken = localStorage.getItem('access_token')

    // Method to get user data from Spotify

    static async getUserData() {
        let userData = await fetch(this.url + 'me', {
            headers: {'Authorization': 'Bearer ' + this.accessToken}
        }).then(response => response.json())
            .then((userData) => {
                return userData
            })
        return userData
    }

    // Method to get users playlist data

    static async getPlaylistsData(limit=50, offset=0) {
        let playlistsData = await fetch(this.url + 'me/playlists?limit='+limit+'&offset='+offset , {
            headers: {'Authorization': 'Bearer ' + this.accessToken}
        }).then(response => response.json())
            .then(playlistsData => {
                return playlistsData
            })
        return playlistsData
    }

    // Method get tracks for playlists

    static async getTracksData(limit = 50, offset = 0) {
        let data = await this.getPlaylistsData(limit, offset)
        let playlistsData = data.items
        let playlistTracks = await playlistsData.map(playlistData => {
            let responsePromise = fetch(playlistData.tracks.href, {
                headers: {'Authorization': 'Bearer ' + this.accessToken}
            })
            let tracksDatapromise = responsePromise
                .then(response => response.json())
            return tracksDatapromise
        })
        let playlistsTracks = Promise.all(playlistTracks)
        const eachPlaylistTrackDatas = []
        await playlistsTracks.then(trackData => {
            trackData.forEach(trackDataItem => {
                eachPlaylistTrackDatas.push(trackDataItem.items)
            })
        })
        return eachPlaylistTrackDatas
    }

    // Method to search songs by name or artist

    static async searchSongs(songName, limit=20) {
        let songsArray = await fetch(this.url + 'search?q='+songName+'&type=track,artist&limit='+limit, {
            headers: { 'Authorization': 'Bearer ' + this.accessToken }
        }).then(response => response.json())
            .then(songs => {
                return songs
            })
        return songsArray
    }

    // Method to get device ID

    static async getDeviceId() {
        let deviceId = await fetch(this.url + 'me/player/devices', {
            headers: { 'Authorization': 'Bearer ' + this.accessToken }
        }).then(response => response.json())
            .then(device => {
                return device
            })
        return deviceId
    }

    static async getCurrentPlaybackInfo() {
        let currentInfo = await fetch(this.url + 'me/player', {
            headers: { 'Authorization': 'Bearer ' + this.accessToken }
        }).then(response => response.json())
            .then(device => {
                return device
            })
        return currentInfo
    }

    static async playPausePlayer() {
        fetch('https://api.spotify.com/v1/melody/v1/check_scope?scope=web-playback', {
            headers: {'Authorization': 'Bearer ' + this.accessToken},
        })
    }

    static seekPosition(position_ms) { // Change playback position
        fetch(this.url + `me/player/seek?position_ms=${position_ms}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${this.accessToken}` }
        }).then(response => console.log(response))
    }

    static playNext() { // Play next track
        fetch(this.url + 'me/player/next', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${this.accessToken}` }
        }).then(response => console.log(response))
    }

    static shuffle(state) { // Toggle shuffle
        fetch(this.url + `me/player/shuffle?state=${state}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${this.accessToken}` }
        })
    }

    static repeat(state) { // Toggle Repeat
        fetch(this.url + 'me/player/repeat', {
            method: 'PUT',
            headers: { 'Authorization': 'Bearer' + this.accessToken,
                        "Accept": "application/json"},
            body: JSON.stringify(state)
        }).then(response => console.log(response))
    }

    static async transferPlaybackHere(deviceId) {
        await fetch("https://api.spotify.com/v1/me/player", {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + this.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "device_ids": [ deviceId ],
                "pause": true,
            }),
        })
    }

    // Take playlist
    // static async getCurrentPlaylist(url) {
    //     let currentPlaylist = await fetch(this.url + 'me/player/recently-played', {
    //         headers: { 'Authorization': 'Bearer ' + this.accessToken }
    //     }).then(response => response.json())
    //         .then(device => {
    //             return device
    //         })
    //     return currentPlaylist
    // }

    // Play song from playlist

    static async playSong(songUri, position) {
        fetch(this.url + 'me/player/play', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'context_uri': songUri,
                'offset': {'position': position}
            })
        })
    }
    static async getPlaylistById(playlistId) {
        let playlistData = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${this.accessToken}` }
        }).then(response => response.json())
            .then(playlistData => {
                return playlistData
            })
        return playlistData
    }

    // Get playlist by ID


    // static async play() {
    //     fetch(this.url + 'me/player/play', {
    //         method: 'PUT',
    //         headers: { 'Authorization': 'Bearer ' + this.accessToken },
    //         body:
    //     }).then(response => response.json())
    //         .then(res => {
    //             return res
    //         })
    // }

}