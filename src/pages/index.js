import '../pages/index.css';

import Card from '../components/Card.js';
import Api from '../components/Api.js'
import FormValidator from '../components/FormValidator.js';
import PopupConfirm from '../components/PopupConfirm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards, validationConfig } from '../utils/constants.js';


/* БЛОК ПЕРЕМЕННЫХ */
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort35',
  headers: {
    authorization: '9b276f44-ded2-4e62-b628-d257305c5531',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__position',
  avatarSelector: '.profile__avatar',
});

api.getPersonalInformation()
.then((res) => {
  userInfo.setUserInfo({
    name: res.name,
    info: res.about,
  });
  userInfo.setAvatar(res.avatar);
  userInfo.setUserId(res._id);

  return api.getInitialCards()
})
.then((res) => {
  for (let i = res.length - 1; i >= 0; i--) {
    const element = createElement(res[i]);
    addElement(element);
  };
})
.catch((err) => {
  console.log(err)
})


function submitAvatarForm(values) {
  const avatarUrl = values['avatar-link'];
  avatarBtn.textContent = 'Сохранение...';
  api.changeAvatar(avatarUrl)
  .then((res) => {
    userInfo.setAvatar(avatarUrl)
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    avatarBtn.textContent = 'Сохранить';
  })
}

// Обработчик отправки формы изменения данных профиля
function submitProfileForm(values) {
  const data = {name: values['personal-name'], info: values['personal-position']};
  profileBtn.textContent = 'Сохранение...'
  api.changePersonalInformation(data)
  .then((res) => userInfo.setUserInfo(data))
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    profileBtn.textContent = 'Сохранить'
  });
}

// Обработчик добавления нового места
function submitPlaceForm(values) {
  addNewPlaceBtn.textContent = 'Сохранение...'
  api.addCard({
    name: values['place-name'],
    link: values['place-link']
  })
  .then((res) => {
    const element = createElement(res);
    addElement(element);
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    addNewPlaceBtn.textContent = 'Сохранить'
  })
};

function confirmDeleteCard(card) {
 confirmBtn.textContent = 'Удаление...';
 api.deleteCard(card.id)
 .then((res) => {
   card.deleteElement();
   deletePopup.close();
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    confirmBtn.textContent = 'Да';
  })
}

function likeClick(card, isLike) {
  let likePromise;
  if (isLike) {
    likePromise = api.like(card.id)
  } else {
    likePromise = api.dislike(card.id)
  }
  likePromise.then((res) => {
    card.setLikesCount(res.likes.length);
    card.toggleButton();
  })
  .catch((err) => {
    console.log(err)
  })
}

// Popup'ы
const placePopup = new PopupWithForm('.page__popup_type_new-place', submitPlaceForm);
placePopup.setEventListeners();

const profilePopup = new PopupWithForm('.page__popup_type_profile', submitProfileForm);
profilePopup.setEventListeners();
const inputName = document.querySelector('.page__popup-input_type_name');
const inputPosition = document.querySelector('.page__popup-input_type_position');
const profileBtn = document.querySelector('.page__popup_type_profile .page__popup-save-button')

const elementPopup = new PopupWithImage('.page__popup_type_photo');
elementPopup.setEventListeners();

const deletePopup = new PopupConfirm('.page__popup_type_delete-card', confirmDeleteCard);
const confirmBtn = document.querySelector('.page__popup_type_delete-card .page__popup-save-button');
deletePopup.setEventListeners();

const avatarPopup = new PopupWithForm('.page__popup_type_avatar', submitAvatarForm);
const avatarBtn = document.querySelector('.page__popup_type_avatar .page__popup-save-button');
avatarPopup.setEventListeners();

// Кнопки, относящиеся к Popup
const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const avatarEditBtn = document.querySelector('.profile__avatar-edit-button');

// Форма изменения данных профиля
const profileForm = document.querySelector('.page__popup_type_profile .page__popup-text');
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

// Форма добавления нового места
const placeForm = document.querySelector('.page__popup_type_new-place .page__popup-text');
const addNewPlaceBtn = document.querySelector('.page__popup_type_new-place .page__popup-save-button')
const placeFormValidator = new FormValidator(validationConfig, placeForm);
placeFormValidator.enableValidation();

const avatarForm = document.querySelector('.page__popup_type_avatar .page__popup-text');
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
avatarFormValidator.enableValidation();

// Контейнер для карточек и стартовые карточки
const elementsList = document.querySelector('.elements');



/* БЛОК ФУНКЦИЙ */

function createElement(data) {
  const userId = userInfo.getUserInfo().id
  const element = new Card(
    data, '#element',
    elementPopup.open.bind(elementPopup),
    deletePopup.open.bind(deletePopup),
    likeClick,
  ).renderCard(userId);
  return element
}

function addElement(element) {
  elementsList.prepend(element);
}

/* БЛОК ОБРАБОТКИ СОБЫТИЙ */

// Отслеживаем нажатия на функциональные кнопки Popup
editProfileButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  inputName.value = data['name'];
  inputPosition.value = data['info'];

  const inputEvent = new Event('input');
  inputName.dispatchEvent(inputEvent);
  inputPosition.dispatchEvent(inputEvent);

  profilePopup.open();
});

addPlaceButton.addEventListener('click', () => {
  placeFormValidator.resetValidation();
  placePopup.open()
});

avatarEditBtn.addEventListener('click', () => {
  avatarPopup.open();
})

/* БЛОК ИНИЦИАЛИЗАЦИИ ДАННЫХ */

// Добавление стартовых карточек на страницу

