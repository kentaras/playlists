export default class {

    // Method to add playlist to DB

    static addPlaylist(playlist) {
        return fetch('http://localhost:8888/insertplaylist/', {
            method: 'PUT',
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

    // Method to add many playlists to db

    static addPlaylists(playlists) {
        return fetch('http://localhost:8888/insertplaylists/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playlists)
        }).then(response => {
            return response.json().then(data => {
                return data
            })
        })
    }

    // Method to count users playlists

    static getUserPlaylistsCount(userId) {
        return fetch('http://localhost:8888/getuserplaylistscount/'+userId, {
        }).then(response => {
            return response.json().then(data => {
                return data
            })
        })
    }

    // Method to get user playlists by id

    static getPlaylistsByUserId(userId, quantity=9999, page=1) {
        return fetch(`http://localhost:8888/getplaylistsforuser/${userId}/${quantity}/${page}`, {
        }).then(response => {
            return response.json().then(data => {
                return data
            })
        })
    }

    // Get playlist data by playlist ID

    static getPlaylistDataById(playlistId) {
        return fetch(`http://localhost:8888/getplaylistdata/${playlistId}`, {
        }).then(response => {
            return response.json().then(data => {
                return data
            })
        })
    }

    // Get users playlistBySearchWord

    static getPlaylistBySearch(userId, searchWord) {
        return fetch(`http://localhost:8888/getplaylistbysearch/${userId}/${searchWord}`, {
        }).then(response => {
            return response.json().then(data => {
                return data
            })
        })
    }


}

/*
export default class {
    static getAllRecipes (itemsPerPage, page) {
         return fetch(`http://localhost:2000/getallrecipes/${itemsPerPage}/${page}`, {
        }).then(response => {
            return response.json().then((data=>{
            return data;
         }))})
    }

    static getRecipesCount () {
        return fetch(`http://localhost:2000/getrecipescount/`, {
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))})
    }

   static getSearchValue (searchValue, itemsPerPage, page) {
        return fetch(`http://localhost:2000/searchrecipe/${searchValue}/${itemsPerPage}/${page}`, {
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))
        })
    }

    static getRecipeById (searchValue) {
        return fetch(`http://localhost:2000/searchrecipebyid/${searchValue}`, {
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))
        })
    }

    static updateRecipe(id, recipe) {
        console.log(id)
        return fetch(`http://localhost:2000/updaterecipe/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
        }).then(response => {
            console.log(response)
            return response.json().then(data => {
                return data;
            })
        })
    }

    static createRecipe(recipe) {
        return fetch(`http://localhost:2000/insertfrommealdb`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
        }).then(response => {
            return response.json().then((data=>{
                return data;
            }))
        })
    }

}
 */