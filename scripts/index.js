// Popup
// Функция открытия Popup
function openPopup(event) {
  const popup = document.querySelector('.page__popup');
  popup.classList.remove('page__popup_hidden');
}

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', openPopup)

// Функция закрытия Popup
function closePopup(event) {
  const popup = document.querySelector('.page__popup');
  popup.classList.add('page__popup_hidden');
}

const closeButton = document.querySelector('.page__popup-close-button');
closeButton.addEventListener('click', closePopup)

const overlay = document.querySelector('.page__popup-overlay');
overlay.addEventListener('click', closePopup);

// Кнопки "Like"
// Функция закрашивания кнопки

function toggleButton(event) {
  event.target.classList.toggle('element__like-button_active')
};

const likeButtons = document.querySelectorAll('.element__like-button');

for (let likeButton of likeButtons) {
  likeButton.addEventListener('click', toggleButton);
};

// Работа с формой
function submitForm(event) {
  event.preventDefault();
  const profileName = document.querySelector('.profile__name');
  const profilePosition = document.querySelector('.profile__position');
  const inputName = document.querySelector('.page__popup-name');
  const inputPosition = document.querySelector('.page__popup-position');

  profileName.textContent = inputName.value;
  profilePosition.textContent = inputPosition.value;

  inputName.value = '';
  inputPosition.value = '';

  closePopup();
}

const form = document.querySelector('.page__popup-text'); // TODO: поправить название
form.addEventListener('submit', submitForm);