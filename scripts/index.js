import { Card } from './card.js';
import { initialCards } from './Constants.js';
import { FormValidator, config } from './FormValidator.js';

const page = document.querySelector('.page');

const popupChageProfile = page.querySelector('#popup-chage-button');
const popupAddCard = page.querySelector('#popup-add-button');
const popupImage = page.querySelector('#popup-image');

const buttonChangeProfile = page.querySelector('.profile__change-button');
const buttonAddCard = page.querySelector('.profile__add-button');

const inputName = popupChageProfile.querySelector('#name');
const inputProfession = popupChageProfile.querySelector('#profession');
const inputTitle = popupAddCard.querySelector('#title');
const inputPlace = popupAddCard.querySelector('#place');

const profileName = page.querySelector('.profile__name');
const profileProfession = page.querySelector('.profile__profession');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

function closePopupByEsc(e) {
  if (e.key === 'Escape') { 
    closePopup(page.querySelector('.popup_opened')); 
  } 
}

function resetErrorStyle (popup, firstInput, secondInput) {
  const error = popup.querySelectorAll('.popup__error');
  [...error].forEach((item) => {
    item.textContent = '';
  });
  firstInput.classList.remove('popup__input_type_error');
  secondInput.classList.remove('popup__input_type_error');
}

function handleProfilPopup () {
  const event = new Event('input');
  openPopup(popupChageProfile);
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  inputName.dispatchEvent(event);
  resetErrorStyle (popupChageProfile, inputName, inputProfession);
}

buttonChangeProfile.addEventListener('click', handleProfilPopup);

function handleCardPopup () {
  openPopup(popupAddCard);
  inputTitle.value = '';
  inputPlace.value = '';
  formValidatorAddCard.disabledButtonSave();
  resetErrorStyle (popupAddCard, inputTitle, inputPlace);
}

buttonAddCard.addEventListener('click', handleCardPopup);

popupChageProfile.querySelector('.popup__close-icon').addEventListener('click', () => {
  closePopup (popupChageProfile)
});
popupAddCard.querySelector('.popup__close-icon').addEventListener('click', () => {
  closePopup (popupAddCard)
});

popupChageProfile.addEventListener('click', closeOverlay);
popupAddCard.addEventListener('click', closeOverlay);
popupImage.addEventListener('click', closeOverlay);

function closeOverlay(event) {
  if (event.currentTarget === event.target) {
    closePopup (event.currentTarget);
}
}

const formPopupProfile = popupChageProfile.querySelector('.popup__form');
const formPopupPlace = popupAddCard.querySelector('.popup__form');

function handleFormSubmitProfile (evt) {
  evt.preventDefault();
   
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup (popupChageProfile);
}

formPopupProfile.addEventListener('submit', handleFormSubmitProfile);

popupImage.querySelector('.popup__close-open-image').addEventListener('click', () => {
  closePopup (popupImage);
});

initialCards.forEach((item) => {
  const card = new Card(item, '#card-template');
  const cardElement = card.generateCard();

  document.querySelector('.card-template').append(cardElement);
});
 
function handleSubmitAdd (evt) {
  evt.preventDefault();
  
  const newCards = {
    name: inputTitle.value,
    link: inputPlace.value
  };

  const card = new Card(newCards, '#card-template');
  const cardElement = card.generateCard();

  document.querySelector('.card-template').prepend(cardElement);

  closePopup (popupAddCard);
}

formPopupPlace.addEventListener('submit', handleSubmitAdd);

const formValidatorProfile = new FormValidator(config, popupChageProfile);
formValidatorProfile.enableValidation();

const formValidatorAddCard = new FormValidator(config, popupAddCard);
formValidatorAddCard.enableValidation();