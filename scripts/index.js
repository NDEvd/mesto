import { Card } from './card.js';
import { initialCards, config } from './constants.js';
import { FormValidator } from './FormValidator.js';

const page = document.querySelector('.page');

const popupChageProfile = page.querySelector('#popup-chage-button');
const formChageProfile = page.querySelector('#form-chage-button');
const popupAddCard = page.querySelector('#popup-add-button');
const formAddCard = page.querySelector('#form-add-button');

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

function handleProfilPopup () {
  openPopup(popupChageProfile);
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  formValidatorProfile.enabledButtonSave();
  formValidatorProfile.resetErrorStyle(inputName, inputProfession);
}

buttonChangeProfile.addEventListener('click', handleProfilPopup);

function handleCardPopup () {
  openPopup(popupAddCard);
  inputTitle.value = '';
  inputPlace.value = '';
  formValidatorAddCard.disabledButtonSave();
  formValidatorAddCard.resetErrorStyle(inputTitle, inputPlace);
}

buttonAddCard.addEventListener('click', handleCardPopup);

popupChageProfile.querySelector('.popup__close-icon').addEventListener('click', () => {
  closePopup (popupChageProfile)
});
popupAddCard.querySelector('.popup__close-icon').addEventListener('click', () => {
  closePopup (popupAddCard)
});

function handleImagePopup (event) {
  openPopup(popupImage);
  const image = event.target.closest('.card-template__element');

  document.querySelector('.popup__image').src = image.querySelector('.card-template__image').src;
  document.querySelector('.popup__image').alt = image.querySelector('.card-template__title').textContent;
  document.querySelector('.popup__image-title').textContent = image.querySelector('.card-template__title').textContent;
}

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

function createCard (data) {
  const card = new Card(data, '#card-template', handleImagePopup);
  const cardElement = card.generateCard();

  return cardElement;
}

initialCards.forEach((item) => {
  const cardInital = createCard(item);
  document.querySelector('.card-template').append(cardInital);
});
 
function handleSubmitAdd (evt) {
  evt.preventDefault();
  
  const newCardsFromInput = {
    name: inputTitle.value,
    link: inputPlace.value
  };

  const cardNew = createCard(newCardsFromInput);
  document.querySelector('.card-template').prepend(cardNew);

  closePopup (popupAddCard);
}

formPopupPlace.addEventListener('submit', handleSubmitAdd);

const formValidatorProfile = new FormValidator(config, formChageProfile);
formValidatorProfile.enableValidation();

const formValidatorAddCard = new FormValidator(config, formAddCard);
formValidatorAddCard.enableValidation();