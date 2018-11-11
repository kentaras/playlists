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