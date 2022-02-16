export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    document.addEventListener('keyup', this._handleEscClose);
    this._popup.classList.add('page__popup_opened');
  }

  close() {
    this._popup.classList.remove('page__popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {

    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('page__popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('page__popup-close-icon')) {
        this.close();
      }
    })
  }
}