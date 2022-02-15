import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._popup.querySelectorAll('input');
    this._form = this._popup.querySelector('form');
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitHandler = (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    }
    this._form.addEventListener('submit', this._submitHandler);
  }

  close() {
    super.close();
    this._form.removeEventListener('submit', this._submitHandler);
    this._inputs.forEach((input) => {
      input.value = ''
    })
  }


}