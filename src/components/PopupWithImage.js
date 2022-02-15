import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(image) {
    const elementPopupPhoto = this._popup.querySelector('.page__popup-image');
    const elementPopupCaption = this._popup.querySelector('.page__popup-caption');
    elementPopupPhoto.src = image.src;
    elementPopupPhoto.alt = image.alt;
    elementPopupCaption.textContent = image.alt;
    super.open();
  }
}
