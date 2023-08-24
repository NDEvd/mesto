export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorSelector: '.popup__error',
  inputErrorClass: 'popup__input_type_error'
};

const page = document.querySelector('.page');
export const popupChageProfile = page.querySelector('#popup-chage-button');
export const popupAddCard = page.querySelector('#popup-add-button');
export const popupChageAvatar = page.querySelector('#popup-chage-avatar');

export const formChageProfile = page.querySelector('#form-chage-button');
export const formAddCard = page.querySelector('#form-add-button');
export const formChageAvatar = page.querySelector('#form-chage-avatar');

export const inputName = page.querySelector('#name');
export const inputProfession = page.querySelector('#profession');
export const inputAvatar = page.querySelector('#avatar');

export const buttonChangeProfile = page.querySelector('.profile__change-button');
export const buttonAddCard = page.querySelector('.profile__add-button');
export const buttonChangeAvatar = page.querySelector('.profile__foto-change');

export const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-73',
  headers: {
    "content-type": "application/json",
    "authorization": "a12a137f-b183-4a1e-a1d4-fa8e2f479a22"
  }
};