const initialCards = [
  {
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinskoblast.jpg'
  },
  {
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

let elementsList = document.querySelector('.elements');

// Функция добавления элемента на страницу

function addElement(name, link) {
  const elementTemplate = document.querySelector('#element').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImg = element.querySelector('.element__photo');
  const elementCaption = element.querySelector('.element__caption-text');
  const elementLikeBtn = element.querySelector('.element__like-button');

  elementImg.src = link;
  elementImg.alt = name;
  elementCaption.textContent = name;
  elementLikeBtn.addEventListener('click', toggleButton);

  elementsList.prepend(element);


}

for (let item of initialCards) {
  addElement(item.name, item.link);
};





const profilePopup = document.querySelector('.page__popup_type_profile');
const profileName = document.querySelector('.profile__name');
const profilePosition = document.querySelector('.profile__position');
const inputName = document.querySelector('.page__popup-input_type_name');
const inputPosition = document.querySelector('.page__popup-input_type_position');

const placePopup = document.querySelector('.page__popup_type_new-place');

function openPopup(popup) {
  popup.classList.remove('page__popup_hidden');
}

function closePopup(popup) {
  popup.classList.add('page__popup_hidden');
}

function openProfilePopup(event) {
  inputName.value = profileName.textContent;
  inputPosition.value = profilePosition.textContent;
  openPopup(profilePopup)
}

function openPlacePopup(event) {
  openPopup(placePopup)
}

function closeProfilePopup(event) {
  closePopup(profilePopup)
}

function closePlacePopup(event) {
  closePopup(placePopup)
}

const editProfileButton = document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', openProfilePopup)

const closeProfileButton = profilePopup.querySelector('.page__popup-close-button');
closeProfileButton.addEventListener('click', closeProfilePopup);

const addPlaceButton = document.querySelector('.profile__add-button');
addPlaceButton.addEventListener('click', openPlacePopup)

const closePlaceButton = placePopup.querySelector('.page__popup-close-button');
closePlaceButton.addEventListener('click', closePlacePopup);

// Кнопки "Like"
// Функция закрашивания кнопки

function toggleButton(event) {
  event.target.classList.toggle('element__like-button_active')
};

// Работа с формой Profile
function submitProfileForm(event) {
  event.preventDefault();

  profileName.textContent = inputName.value;
  profilePosition.textContent = inputPosition.value;

  inputName.value = '';
  inputPosition.value = '';

  closePopup(profilePopup);
}

const profileForm = document.querySelector('.page__popup_type_profile .page__popup-text');
profileForm.addEventListener('submit', submitProfileForm);


function submitPlaceForm(event) {
  event.preventDefault();

  const inputPlace = document.querySelector('.page__popup-input_type_place');
  const inputLink = document.querySelector('.page__popup-input_type_link');

  addElement(inputPlace.value, inputLink.value);

  inputPlace.value = '';
  inputLink.value = '';

  closePopup(placePopup);
};

const placeForm = document.querySelector('.page__popup_type_new-place .page__popup-text');
placeForm.addEventListener('submit', submitPlaceForm);








