export default class {

    static url = 'https://api.spotify.com/v1/'
    static playlistsDataVar = {
        playlistNames: [],
        playlistImages: [],
        onlyPlaylistNames: []
    }
    static accessToken = localStorage.getItem('access_token')

    static async getUserData() {
        let userData = await fetch(this.url + 'me', {
            headers: {'Authorization': 'Bearer ' + this.accessToken}
        }).then(response => response.json())
            .then((userData) => {
                return userData
            })
        return userData
    }

    static async getPlaylistsData() {
        let playlistsData = await fetch(this.url + 'me/playlists', {
            headers: {'Authorization': 'Bearer ' + this.accessToken}
        }).then(response => response.json())
            .then(playlistsData => {
                return playlistsData.items
            })
        return playlistsData
    }

    static async getTracksData() {
        let playlistsData = await this.getPlaylistsData()
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