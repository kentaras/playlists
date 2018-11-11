export default class {

    // Method to add playlist to DB

    static addPlaylist(playlist) {
        return fetch('http://localhost:8888/insertplaylist', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playlist)
        }).then(response => {
            return response.json().then(data => {
                return data
            })
        })
    }


}