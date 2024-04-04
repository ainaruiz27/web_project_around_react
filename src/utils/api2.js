class Api {
    constructor(url, token) {
        this._url = url;
        this._token = token;
    }
    getUserInfo() {
        return fetch(this._url + '/users/me', {
            headers: {
                Authorization: this._token
            }
        }).then(response => response.json())
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                "authorization": this._token,
                "Content-Type": "application/json"
            },
        }).then(response => response.json());
    }

    updateUser({name = null, about = null, avatar = null}) {
        const params = {};
        if(avatar){
            params.avatar = avatar;
        }else{
            params.name = name;
            params.about = about;            
        }
        return fetch(`${this._url}/users/me${avatar? '/avatar': ''}`, {
            headers: {
                "authorization": this._token,
                "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify(params),
        }).then(response => response.json());
    }

    addCard(link, title) {
        return fetch(`${this._url}/cards`, {
            headers: {
                Authorization: this._token,
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({
                name: title,
                link,
            })
        }).then(response => response.json())
    }

    deleteCard(idCard) {
        return fetch(this._url + "/cards/" + idCard, {
            headers: {
                Authorization: this._token,
                "Content-Type": "application/json",
            },
            method: "DELETE",
        }).then(response => response.json())
    }

    addLike(idCard) {
        return fetch(this._url + "/cards/likes/" + idCard, {
            headers: {
                Authorization: this._token,
                "Content-Type": "application/json",
            },
            method: "PUT",
        }).then(response => response.json());
    }

    removeLike(idCard) {
        return fetch(this._url + "/cards/likes/" + idCard, {
            headers: {
                Authorization: this._token,
                "Content-Type": "application/json",
            },
            method: "DELETE",
        }).then(response => response.json());
    }

}

export const api = new Api('https://around.nomoreparties.co/v1/web_es_11', 'e261a8b3-b4ff-46a8-9ab6-ef7a9f75bcee');


export default api;