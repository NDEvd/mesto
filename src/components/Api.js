export default class Api {
  constructor(configApi) {
    this._url = configApi.url;
    this._headers = configApi.headers;
    this._authorization = configApi.headers.authorization;
    this._contentType = configApi.headers["content-type"];

  }

  getAllInfo() {
    return Promise.all([this.getProfile(), this.getInitialCards()])
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
      .then((res) => {
          return res.ok ? res.json() : res.json().then(errData => Promise.reject(errData))
        })
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
      .then((res) => {
          return res.ok ? res.json() : res.json().then(errData => Promise.reject(errData));
        })
  }

  saveProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
          return res.ok ? res.json() : res.json().then(errData => Promise.reject(errData));
        })
        
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: {
            authorization: this._authorization,
            'Content-Type': this._contentType
          },
          body: JSON.stringify(data)
        })
          .then((res) => {
              return res.ok ? res.json() : res.json().then(errData => Promise.reject(errData));
            })
  }

  deleteCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
      .then((res) => {
          return res.ok ? res.json() : res.json().then(errData => Promise.reject(errData));
        })
  }

  counteLike(idCard, isLiked) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
    .then((res) => {
      return res.ok ? res.json() : res.json().then(errData => Promise.reject(errData));
    })
  }

}