export default class Card {
  constructor(name, link, selector, handleCardClick) {
    this.name = name;
    this.link = link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._selector).content.cloneNode(true);
    return cardTemplate
  }

  renderCard() {
    this._card = this._getTemplate();
    const cardImg = this._card.querySelector('.element__photo');
    const cardCaption = this._card.querySelector('.element__caption-text');

    cardImg.src = this.link;
    cardImg.alt = this.name;
    cardCaption.textContent = this.name;

    this._likeBtn = this._card.querySelector('.element__like-button');
    this._deleteBtn = this._card.querySelector('.element__delete-button');
    this._photo = this._card.querySelector('.element__photo');
    this._setEventListeners();

    return this._card
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', (event) => {
      this._toggleButton(event);
    })
    this._deleteBtn.addEventListener('click', (event) => {
      this._deleteElement(event);
    })
    this._photo.addEventListener('click', (event) => {
      this._handleCardClick(this._photo);
    })
  }

  _toggleButton(event) {
    event.target.classList.toggle('element__like-button_active');
  }

  _deleteElement(event) {
    const elementItem = event.target.closest('.element');
    elementItem.remove();
  }


}