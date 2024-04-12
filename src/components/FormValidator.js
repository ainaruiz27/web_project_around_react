export default class FormValidator {
    constructor(config, formElement) {
      this._config = config;
      this._formElement = formElement;
      this._inputList = Array.from(
        formElement.querySelectorAll(this._config.inputSelector)
      );
      this._buttonElement = formElement.querySelector(
        this._config.submitButtonSelector
      );
  
      this._inputErrorClass = this._config.inputErrorClass;
      this._errorClass = this._config.errorClass;
  
      this._submitButtonState = this._config.submitButtonState;
  
      this._setEventListeners();
    }
  
    _setEventListeners() {
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._handleInput(inputElement);
        });
      });
  
      this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
  
      this._toggleButtonState();
    }
  
    _handleInput(inputElement) {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
    }
  
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
      } else {
        this._hideInputError(inputElement);
      }
    }
  
    _showInputError(inputElement) {
      const errorElement = this._formElement.querySelector(
        `.${inputElement.id}-error`
      );
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._errorClass);
    }
  
    _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(
        `.${inputElement.id}-error`
      );
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._errorClass);
    }
  
    _hasInvalidInput() {
      return this._inputList.some((inputElement) => !inputElement.validity.valid);
    }
  
    _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._buttonElement.classList.add(this._submitButtonState.disabledClass);
        this._buttonElement.disabled = true;
      } else {
        this._buttonElement.classList.remove(
          this._submitButtonState.disabledClass
        );
        this._buttonElement.disabled = false;
      }
    }
  
    enableValidation() {
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._handleInput(inputElement);
        });
      });
  
      this._toggleButtonState();
    }
  }
  
  