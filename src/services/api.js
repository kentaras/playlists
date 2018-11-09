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
}

//         let playlists = playlistData.items
//         let trackDataPromises = playlists.map(playlist => {
//             let responsePromise = fetch(playlist.tracks.href, {
//                 headers: {'Authorization': 'Bearer ' + accessToken}
//             })
//             let trackDataPromise = responsePromise
//                 .then(response => response.json())
//             return trackDataPromise
//         })
//         let allTracksData = Promise.all(trackDataPromises)
//         let playlistsPromise = allTracksData.then(trackDatas => {
//             trackDatas.forEach((trackData, i) => {
//                 playlists[i].trackDatas = trackData.items
//             })
//             return playlists
//         })
//         return playlistsPromise
//     })
// }).then((playlistsArray) => {
//     playlistsArray.map((playlist) => {
//         let listPlay = {}
//         listPlay.name = playlist.name
//         listPlay.image = playlist.images[0].url
//         listPlay.trackNames = []
//         listPlay.artistNames = []
//         playlist.trackDatas.map(trackData => {
//             listPlay.trackNames.push(trackData.track.name)
//             listPlay.artistNames.push(trackData.track.artists[0].name)
//         })
//         this.playlist.push(listPlay)
//     })