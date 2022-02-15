export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config['inputSelector']));
    this._buttonElement = this._form.querySelector(this._config['submitButtonSelector']);
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
    this._toggleButtonState();

    const klass = this;
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        klass._toggleButtonState();
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

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config['inactiveButtonClass']);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config['inactiveButtonClass'])
      this._buttonElement.disabled = false;
    }
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }

}