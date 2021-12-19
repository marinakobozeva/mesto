export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config['inputErrorClass']);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config['errorClass']);
  };

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config['inputErrorClass']);
    errorElement.classList.remove(this._config['errorClass']);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._config['inputSelector']));
    const buttonElement = this._form.querySelector(this._config['submitButtonSelector']);

    this._toggleButtonState(inputList, buttonElement);

    const klass = this;
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        klass._toggleButtonState(inputList, buttonElement);
        klass._checkInputValidity(inputElement);
      });
    });
  };

  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._config['inactiveButtonClass']);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._config['inactiveButtonClass'])
      buttonElement.disabled = false;
    }
  }

}