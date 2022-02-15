export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
    this._name = document.querySelector(this._nameSelector);
    this._info = document.querySelector(this._infoSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent
    }
  }

  setUserInfo({ name, info }) {
    this._name.textContent = name;
    this._info.textContent = info;
  }
}