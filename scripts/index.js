import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initialCards.js';

/* БЛОК ПЕРЕМЕННЫХ */

// Popup'ы
const popups = document.querySelectorAll('.page__popup');

const placePopup = document.querySelector('.page__popup_type_new-place');
const inputPlace = document.querySelector('.page__popup-input_type_place');
const inputLink = document.querySelector('.page__popup-input_type_link');

const profilePopup = document.querySelector('.page__popup_type_profile');
const profileName = document.querySelector('.profile__name');
const profilePosition = document.querySelector('.profile__position');
const inputName = document.querySelector('.page__popup-input_type_name');
const inputPosition = document.querySelector('.page__popup-input_type_position');

const elementPopup = document.querySelector('.page__popup_type_photo');
const elementPopupPhoto = document.querySelector('.page__popup_type_photo .page__popup-image');
const elementPopupCaption = document.querySelector('.page__popup_type_photo .page__popup-caption');

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

// Общая функция открытия Popup
function openPopup(popup) {
  document.addEventListener('keyup', closePopupOnEsc);
  popup.classList.add('page__popup_opened');
}

// Общая функция закрытия Popup
function closePopup(popup) {
  popup.classList.remove('page__popup_opened');
  document.removeEventListener('keyup', closePopupOnEsc);
}

// Функция открытия Popup изменения данных профиля
function openProfilePopup(event) {
  // Задаем начальные значения полям Имя и Род деятельности
  inputName.value = profileName.textContent;
  inputPosition.value = profilePosition.textContent;

  const inputEvent = new Event('input');
  inputName.dispatchEvent(inputEvent);
  inputPosition.dispatchEvent(inputEvent);

  openPopup(profilePopup)
}

// Функция открытия Popup добавления нового места
function openPlacePopup(event) {
  // Очищаем форму от введенных ранее значений
  placeFormValidator.resetValidation();
  openPopup(placePopup);
}

// Функция открытия Popup просмотра фотографии
function openElementPopup(photo) {
  elementPopupPhoto.src = photo.src;
  elementPopupPhoto.alt = photo.alt;
  elementPopupCaption.textContent = photo.alt;
  openPopup(elementPopup);
}

function addElement(name, link) {
  const element = new Card(name, link, '#element', openElementPopup).renderCard();
  elementsList.prepend(element);
}

// Обработчик отправки формы изменения данных профиля
function submitProfileForm(event) {
  event.preventDefault();

  profileName.textContent = inputName.value;
  profilePosition.textContent = inputPosition.value;

  closePopup(profilePopup);

  inputName.value = '';
  inputPosition.value = '';
}

// Обработчик добавления нового места
function submitPlaceForm(event) {
  event.preventDefault();

  addElement(inputPlace.value, inputLink.value);
  closePopup(placePopup);

  inputPlace.value = '';
  inputLink.value = '';
};

// Обработчик закрытия Popup на Esc
function closePopupOnEsc(event) {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.page__popup_opened'));
  }
}

// Закрытие попапов
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('page__popup_opened')) {
          closePopup(popup);
        }
        if (evt.target.classList.contains('page__popup-close-icon')) {
          closePopup(popup);
        }
    })
})

/* БЛОК ОБРАБОТКИ СОБЫТИЙ */

// Отслеживаем нажатия на функциональные кнопки Popup
editProfileButton.addEventListener('click', openProfilePopup);
addPlaceButton.addEventListener('click', openPlacePopup);

// Обработчик отправки формы изменения данных пользователя
profileForm.addEventListener('submit', submitProfileForm);

// Обработчик отправки формы добавления нового места
placeForm.addEventListener('submit', submitPlaceForm);

/* БЛОК ИНИЦИАЛИЗАЦИИ ДАННЫХ */

// Добавление стартовых карточек на страницу
for (let item of initialCards) {
  addElement(item.name, item.link);
};
