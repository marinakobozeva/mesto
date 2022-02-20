export default class Card {
  constructor(data, selector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this.name = data.name;
    this.link = data.link;
    this.id = data._id;
    this.likes = data.likes;
    this._owner = data.owner;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._selector).content.cloneNode(true);
    return cardTemplate
  }

  renderCard(userId) {
    this._card = this._getTemplate();
    this._element = this._card.querySelector('.element');
    const isOwner = userId === this._owner._id;
    const cardImg = this._card.querySelector('.element__photo');
    const cardCaption = this._card.querySelector('.element__caption-text');

    cardImg.src = this.link;
    cardImg.alt = this.name;
    cardCaption.textContent = this.name;

    this._likeBtn = this._card.querySelector('.element__like-button');
    this._likesCounter = this._card.querySelector('.element__like-text');
    this._deleteBtn = this._card.querySelector('.element__delete-button');
    this._photo = this._card.querySelector('.element__photo');
    this._setEventListeners();

    this.setLikesCount(this.likes.length);
    this._setLikeBtnState(userId);



    if (!isOwner) {
      this._deleteBtn.remove();
    }

    return this._card
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', (event) => {
      const isLike = this._likeBtn.classList.contains('element__like-button_active') ? false : true;
      this._handleLikeClick(this, isLike);
    })
    this._deleteBtn.addEventListener('click', (event) => {
      this._handleDeleteClick(this);
    })
    this._photo.addEventListener('click', (event) => {
      this._handleCardClick(this._photo);
    })
  }

  toggleButton() {
    this._likeBtn.classList.toggle('element__like-button_active');
  }

  deleteElement() {
    this._element.remove();
  }

  setLikesCount(count) {
    this._likesCounter.textContent = count;
  }

  _setLikeBtnState(userId) {
    for (let like of this.likes) {
      if (like._id === userId) {
        this.toggleButton();
      }
    }
  }
}