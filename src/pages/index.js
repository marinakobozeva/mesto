import '../pages/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from '../components/initialCards.js';

/* БЛОК ПЕРЕМЕННЫХ */
const userInfo = new UserInfo({ nameSelector: '.profile__name', infoSelector: '.profile__position'});

// Обработчик отправки формы изменения данных профиля
function submitProfileForm(values) {
  const data = {name: values['personal-name'], info: values['personal-position']};
  userInfo.setUserInfo(data);
}

// Обработчик добавления нового места
function submitPlaceForm(values) {
  const element = createElement(values['place-name'], values['place-link']);
  addElement(element);
};

// Popup'ы
const placePopup = new PopupWithForm('.page__popup_type_new-place', submitPlaceForm);

const profilePopup = new PopupWithForm('.page__popup_type_profile', submitProfileForm);
const inputName = document.querySelector('.page__popup-input_type_name');
const inputPosition = document.querySelector('.page__popup-input_type_position');

const elementPopup = new PopupWithImage('.page__popup_type_photo');
// const elementPopup = document.querySelector('.page__popup_type_photo');
// const elementPopupPhoto = document.querySelector('.page__popup_type_photo .page__popup-image');
// const elementPopupCaption = document.querySelector('.page__popup_type_photo .page__popup-caption');

// Кнопки, относящиеся к Popup
const editProfileButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');

const validationConfig = {
  'formSelector': '.page__popup-text',
  'inputSelector': '.page__popup-input',
  'submitButtonSelector':  '.page__popup-save-button',
  'inactiveButtonClass': 'page__popup-save-button_inactive',
  'inputErrorClass': 'page__popup-input_type_error',
  'errorClass': 'page__popup-input-error_active'
}

// Форма изменения данных профиля
const profileForm = document.querySelector('.page__popup_type_profile .page__popup-text');
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

// Форма добавления нового места
const placeForm = document.querySelector('.page__popup_type_new-place .page__popup-text');
const placeFormValidator = new FormValidator(validationConfig, placeForm);
placeFormValidator.enableValidation();

// Контейнер для карточек и стартовые карточки
const elementsList = document.querySelector('.elements');

/* БЛОК ФУНКЦИЙ */

function createElement(name, link) {
  const element = new Card(name, link, '#element', elementPopup.open.bind(elementPopup)).renderCard();
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

/* БЛОК ИНИЦИАЛИЗАЦИИ ДАННЫХ */

// Добавление стартовых карточек на страницу
for (let item of initialCards) {
  const element = createElement(item.name, item.link);
  addElement(element);
};
