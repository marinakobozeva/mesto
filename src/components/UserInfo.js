export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
    this._avatarSelector = avatarSelector;
    this._name = document.querySelector(this._nameSelector);
    this._info = document.querySelector(this._infoSelector);
    this._avatar = document.querySelector(this._avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
      avatar: this._avatar.src,
      id: this._id,
    }
  }

  setUserInfo({ name, info }) {
    this._name.textContent = name;
    this._info.textContent = info;
  }

  setAvatar(avatarUrl) {
    this._avatar.src = avatarUrl;
  }

  setUserId(id) {
    this._id = id;
  }
}