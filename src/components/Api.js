export default class Api {
  constructor(options) {
    this._options = options;
  }

  _responseValidation(res) {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`,
      {headers: this._options.headers}
    )
      .then(this._responseValidation)
  }

  getPersonalInformation() {
    return fetch(`${this._options.baseUrl}/users/me`,
      {headers: this._options.headers}
    )
      .then(this._responseValidation)
  }

  changePersonalInformation({ name, info }) {
    return fetch(`${this._options.baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this._options.headers,
        body: JSON.stringify({
          name: name,
          about: info,
        })
      })
      .then(this._responseValidation)
  }

  changeAvatar(avatarUrl) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this._options.headers,
        body: JSON.stringify({
          avatar: avatarUrl,
        })
      })
      .then(this._responseValidation)
  }

  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: this._options.headers,
      })
      .then(this._responseValidation)
  }

  addCard({ name, link }) {
    return fetch(`${this._options.baseUrl}/cards`,
      {
        method: 'POST',
        headers: this._options.headers,
        body: JSON.stringify({
          name: name,
          link: link,
        })
      })
      .then(this._responseValidation)
  }

  like(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`,
      {
        method: 'PUT',
        headers: this._options.headers,
      })
      .then(this._responseValidation)
  }

  dislike(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`,
      {
        method: 'DELETE',
        headers: this._options.headers,
      })
      .then(this._responseValidation)
  }
}

