import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(selector, handleConfirm) {
    super(selector)
    this._handleConfirm = handleConfirm;
    this._okBtn = this._popup.querySelector('.page__popup-save-button');
  }

  setEventListeners() {
    super.setEventListeners();

    this._okBtn.addEventListener('click', () => {
      this._handleConfirm(this._item);
      this.close();
    });
  }

  open(item) {
    this._item = item;
    super.open();
  }

}