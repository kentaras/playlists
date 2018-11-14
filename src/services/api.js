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




}