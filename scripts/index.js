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

// Форма изменения данных профиля
const profileForm = document.querySelector('.page__popup_type_profile .page__popup-text');

// Форма добавления нового места
const placeForm = document.querySelector('.page__popup_type_new-place .page__popup-text');

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

  if (preparePopupForm !== undefined) {
    preparePopupForm(profileForm);
  }

  openPopup(profilePopup)
}

// Функция открытия Popup добавления нового места
function openPlacePopup(event) {
  // Очищаем форму от введенных ранее значений
  placeForm.reset()
  
  if (preparePopupForm !== undefined) {
    preparePopupForm(placeForm);
  }

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

// Функция добавления элемента в контейнер карточек
function createElement(name, link) {
  const elementTemplate = document.querySelector('#element').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImg = element.querySelector('.element__photo');
  const elementCaption = element.querySelector('.element__caption-text');
  const elementLikeBtn = element.querySelector('.element__like-button');
  const elementDeleteBtn = element.querySelector('.element__delete-button');

  elementImg.src = link;
  elementImg.alt = name;
  elementCaption.textContent = name;

  elementLikeBtn.addEventListener('click', toggleButton);
  elementDeleteBtn.addEventListener('click', deleteElement);
  elementImg.addEventListener('click', openElementPopup);

  return element;
}

function addElement(name, link) {
  const element = createElement(name, link);
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
