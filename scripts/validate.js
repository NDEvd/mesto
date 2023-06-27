function showError (inputElement, errorElement) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideError (inputElement, errorElement) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function chekInputValidity(inputElement, formElement) {

  const resultInputValidity = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    if (!resultInputValidity) {
    showError (inputElement, errorElement);
    } else {
    hideError (inputElement, errorElement);
  }
}

function disabledButtonSave (buttonElement) {
  buttonElement.disabled = "disabled";
  buttonElement.classList.add(config.inactiveButtonClass);
}

function enabledButtonSave (buttonElement) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
}

function toggleButtonSaveStyle (buttonElement, isActive) {
  if (!isActive) {
    disabledButtonSave(buttonElement);
  } else {
    enabledButtonSave(buttonElement);
  }
}

function setEventListener(formElement) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const buttonSave = formElement.querySelector(config.submitButtonSelector);
  
  toggleButtonSaveStyle (buttonSave, formElement.checkValidity());

  [...inputList].forEach(function (inputElement) {
    inputElement.addEventListener('input', function() {
      toggleButtonSaveStyle (buttonSave, formElement.checkValidity());
      chekInputValidity(inputElement, formElement);
    });
  });
  
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (!formElement.checkValidity()) return;
    
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
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(config);