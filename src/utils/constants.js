// export const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorSelector: '.popup__error',
  inputErrorClass: 'popup__input_type_error'
};

const page = document.querySelector('.page');
export const formChageProfile = page.querySelector('#form-chage-button');
export const formAddCard = page.querySelector('#form-add-button');
export const formConfirmDelete = page.querySelector('#form-confirm-delete');
export const inputName = page.querySelector('#name');
export const inputProfession = page.querySelector('#profession');
export const buttonChangeProfile = page.querySelector('.profile__change-button');
export const buttonAddCard = page.querySelector('.profile__add-button');

export const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-73',
  headers: {
    "content-type": "application/json",
    "authorization": "a12a137f-b183-4a1e-a1d4-fa8e2f479a22"
  }
  
};