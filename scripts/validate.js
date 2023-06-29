function showError (inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideError (inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function chekInputValidity(inputElement, formElement, config) {

  const resultInputValidity = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    if (!resultInputValidity) {
    showError (inputElement, errorElement, config);
    } else {
    hideError (inputElement, errorElement, config);
  }
}

function disabledButtonSave (buttonElement, config) {
  buttonElement.disabled = "disabled";
  buttonElement.classList.add(config.inactiveButtonClass);
}

function enabledButtonSave (buttonElement, config) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
}

function toggleButtonSaveStyle (buttonElement, isActive, config) {
  if (!isActive) {
    disabledButtonSave(buttonElement, config);
  } else {
    enabledButtonSave(buttonElement, config);
  }
}

function setEventListener(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const buttonSave = formElement.querySelector(config.submitButtonSelector);
  
  toggleButtonSaveStyle (buttonSave, formElement.checkValidity(), config);

  [...inputList].forEach(function (inputElement) {
    inputElement.addEventListener('input', function() {
      toggleButtonSaveStyle (buttonSave, formElement.checkValidity(), config);
      chekInputValidity(inputElement, formElement, config);
    });
  });
  
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    // if (!formElement.checkValidity()) return;
    console.log("Форма отправлена!");
  });
}

function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  [...formList].forEach(function (formElement) {
    setEventListener(formElement, config);
  });
}

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error'
};

enableValidation(config);