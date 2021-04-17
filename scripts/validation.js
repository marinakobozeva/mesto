const validationConfig = {
  'formSelector': '.page__popup-text',
  'inputSelector': '.page__popup-input',
  'submitButtonSelector':  '.page__popup-save-button',
  'inactiveButtonClass': 'page__popup-save-button_inactive',
  'inputErrorClass': 'page__popup-input_type_error',
  'errorClass': 'page__popup-input-error_active'
}

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config['inputErrorClass']);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config['errorClass']);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config['inputErrorClass']);
  errorElement.classList.remove(config['errorClass']);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config['inputSelector']));
  const buttonElement = formElement.querySelector(config['submitButtonSelector']);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement, config);
      checkInputValidity(formElement, inputElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config['formSelector']));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, config)
  });
};


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config['inactiveButtonClass']);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config['inactiveButtonClass'])
    buttonElement.disabled = false;
  }
}

// Функция подготовливает Popup в момент его открытия: устанавливает корректное состояние submit кнопки в
// зависимости от состояния полей
function preparePopupForm(popup) {
  const popupForm = popup.querySelector('.page__popup-text');

  if (popupForm !== null) {
    const inputList = Array.from(popupForm.querySelectorAll('.page__popup-input'));
    const buttonElement = popupForm.querySelector('.page__popup-save-button');

    toggleButtonState(inputList, buttonElement, validationConfig)
  }
}

// Функция приводит Popup в первоначальное состояние при его закрытии
function cleanUpPopup(popup) {
  const popupForm = popup.querySelector('.page__popup-text');

  if (popupForm !== null) {
    const inputList = Array.from(popupForm.querySelectorAll('.page__popup-input'));

    popupForm.reset();
    inputList.forEach((input) => hideInputError(popupForm, input, validationConfig));
  }
}

enableValidation(validationConfig);
