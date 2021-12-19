import Card from './Card.js';
import FormValidator from './FormValidator.js';

/* БЛОК ПЕРЕМЕННЫХ */

// Popup'ы
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
const closeProfileButton = profilePopup.querySelector('.page__popup-close-button');
const addPlaceButton = document.querySelector('.profile__add-button');
const closePlaceButton = placePopup.querySelector('.page__popup-close-button');
const closeElementButton = elementPopup.querySelector('.page__popup-close-button');

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
  const btnSave = placeForm.querySelector('.page__popup-save-button')
  placeForm.reset();
  btnSave.disabled = true;
  btnSave.classList.add('page__popup-save-button_inactive');

  openPopup(placePopup);
}

// Функция открытия Popup просмотра фотографии
function openElementPopup(event) {
  const elementPhoto = event.target;
  elementPopupPhoto.src = elementPhoto.src;
  elementPopupPhoto.alt = elementPhoto.alt;
  elementPopupCaption.textContent = elementPhoto.alt;
  openPopup(elementPopup);
}

// Функция изменения цвета кнопки Like
function toggleButton(event) {
  event.target.classList.toggle('element__like-button_active');
};

// Функция удаления элемента из контейнера карточек
function deleteElement(event) {
  const elementItem = event.target.closest('.element');
  elementItem.remove();
}

function addElement(name, link) {
  const element = new Card(name, link, '#element').renderCard();
  const elementImg = element.querySelector('.element__photo');
  elementImg.addEventListener('click', openElementPopup);
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

function closePopupOnOverlay(event) {
  if (event.target.classList.contains('page__popup')) {
    closePopup(event.target)
  }
}

/* БЛОК ОБРАБОТКИ СОБЫТИЙ */

// Отслеживаем нажатия на функциональные кнопки Popup
editProfileButton.addEventListener('click', openProfilePopup);
profilePopup.addEventListener('click', closePopupOnOverlay);
closeProfileButton.addEventListener('click', function () {closePopup(profilePopup)})

addPlaceButton.addEventListener('click', openPlacePopup);
placePopup.addEventListener('click', closePopupOnOverlay);
closePlaceButton.addEventListener('click', function () {closePopup(placePopup)})

elementPopup.addEventListener('click', closePopupOnOverlay);
closeElementButton.addEventListener('click', function () {closePopup(elementPopup)})

// Обработчик отправки формы изменения данных пользователя
profileForm.addEventListener('submit', submitProfileForm);

// Обработчик отправки формы добавления нового места
placeForm.addEventListener('submit', submitPlaceForm);

/* БЛОК ИНИЦИАЛИЗАЦИИ ДАННЫХ */

// Добавление стартовых карточек на страницу
for (let item of initialCards) {
  addElement(item.name, item.link);
};
