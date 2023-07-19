export class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._inputErrorSelector = config.inputErrorSelector;

    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonSave = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showError(inputElement, errorElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  
  _chekInputValidity(inputElement) {
    const resultInputValidity = inputElement.validity.valid;
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    if (!resultInputValidity) {
      this._showError(inputElement, errorElement);
    } else {
      this._hideError(inputElement, errorElement);
    }
  }
  
  disabledButtonSave() {
    this._buttonSave.disabled = "disabled";
    this._buttonSave.classList.add(this._inactiveButtonClass);
  }

  enabledButtonSave() {
    this._buttonSave.disabled = false;
    this._buttonSave.classList.remove(this._inactiveButtonClass);
  }

  toggleButtonSaveStyle(isActive) {
    if (!isActive) {
      this.disabledButtonSave();
    } else {
      this.enabledButtonSave();
    }
  }
  
  resetErrorStyle (firstInput, secondInput) {
    const error = this._formElement.querySelectorAll(this._inputErrorSelector);
    [...error].forEach((item) => {
      item.textContent = '';
    });
    firstInput.classList.remove(this._inputErrorClass);
    secondInput.classList.remove(this._inputErrorClass);
  }

  _setEventListener() {
    this.toggleButtonSaveStyle(this._formElement.checkValidity());
    
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.toggleButtonSaveStyle(this._formElement.checkValidity());
        this._chekInputValidity(inputElement);
      });
    });

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      // if (!formElement.checkValidity()) return;
      console.log("Форма отправлена!");
    });
  }

  enableValidation() {
    this._setEventListener();
  }
}