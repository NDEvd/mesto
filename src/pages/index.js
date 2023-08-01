import './index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import { initialCards, config } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo';

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

// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupByEsc);
// }

// function closePopup (popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupByEsc);
// };

// function closePopupByEsc(e) {
//   if (e.key === 'Escape') { 
//     closePopup(page.querySelector('.popup_opened')); 
//   } 
// }

// function handleProfilPopup () {
//   openPopup(popupChageProfile);
//   inputName.value = profileName.textContent;
//   inputProfession.value = profileProfession.textContent;
//   formValidatorProfile.enabledButtonSave();
//   formValidatorProfile.resetErrorStyle();
// }

// buttonChangeProfile.addEventListener('click', handleProfilPopup);

// function handleCardPopup () {
//   openPopup(popupAddCard);
//   inputTitle.value = '';
//   inputPlace.value = '';
//   formValidatorAddCard.disabledButtonSave();
//   formValidatorAddCard.resetErrorStyle();
// }

// buttonAddCard.addEventListener('click', handleCardPopup);

// popupChageProfile.querySelector('.popup__close-icon').addEventListener('click', () => {
//   closePopup (popupChageProfile)
// });
// popupAddCard.querySelector('.popup__close-icon').addEventListener('click', () => {
//   closePopup (popupAddCard)
// });

// function handleImagePopup (linkImage, titleImage) {
//   openPopup(popupImage);
  
//   document.querySelector('.popup__image').src = linkImage;
//   document.querySelector('.popup__image').alt = titleImage;
//   document.querySelector('.popup__image-title').textContent = titleImage;
// }

// popupChageProfile.addEventListener('click', closeOverlay);
// popupAddCard.addEventListener('click', closeOverlay);
// popupImage.addEventListener('click', closeOverlay);

// function closeOverlay(event) {
//   if (event.currentTarget === event.target) {
//     closePopup (event.currentTarget);
// }
// }

const formPopupProfile = popupChageProfile.querySelector('.popup__form');
const formPopupPlace = popupAddCard.querySelector('.popup__form');

// function handleFormSubmitProfile (evt) {
//   evt.preventDefault();
   
//   profileName.textContent = inputName.value;
//   profileProfession.textContent = inputProfession.value;
//   closePopup (popupChageProfile);
// }

// formPopupProfile.addEventListener('submit', handleFormSubmitProfile);




// buttonChangeProfile.addEventListener('click', );

buttonAddCard.addEventListener('click', () => {
  popupAddCardFromClass.openPopup();
  formValidatorAddCard.disabledButtonSave();
  formValidatorAddCard.resetErrorStyle();
});

buttonChangeProfile.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupChageProfileFromClass.openPopup();
  const userInfoProfile = userInfo.getUserInfo()
  inputName.value = userInfoProfile.name;
  inputProfession.value = userInfoProfile.profession;
  formValidatorProfile.enabledButtonSave();
  formValidatorProfile.resetErrorStyle();
});


const popupImageFromClass = new PopupWithImage('#popup-image');
popupImageFromClass.setEventListeners();

function handleCardClick(linkImage, titleImage) {
  popupImageFromClass.openPopup(linkImage, titleImage);
}

function createCard (item) {
  const card = new Card(item, '#card-template', handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

// созд экз класса кард плюс секшн
const cardInital = new Section({
  items: initialCards,
  renderer: (item) => {
    cardInital.addItem(createCard(item), 'append');
  }
}, '.card-template');

cardInital.renderItems();


const popupAddCardFromClass = new PopupWithForm({
  popupSelector: '#popup-add-button',
  handleFormSubmit: (formData) => {
    cardInital.addItem(createCard({
      name: formData.name,
      link: formData.link
    }), 'prepend');
  popupAddCardFromClass.closePopup();
  }
});
popupAddCardFromClass.setEventListeners();



const userInfo = new UserInfo ({
  nameSelector: '.profile__name',
  professionSelector: '.profile__profession'
})

const popupChageProfileFromClass = new PopupWithForm({
  popupSelector: '#popup-chage-button',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    popupChageProfileFromClass.closePopup();
  }
});
popupChageProfileFromClass.setEventListeners();

// initialCards.forEach((item) => {
//   const cardInital = createCard(item);
//   document.querySelector('.card-template').append(cardInital);
// });

// function handleSubmitAdd (evt) {
//   evt.preventDefault();
  
//   const newCardsFromInput = {
//     name: inputTitle.value,
//     link: inputPlace.value
//   };

//   const cardNew = new Card(newCardsFromInput, '#card-template', handleCardClick);
//   const cardElement = cardNew.generateCard();
//   document.querySelector('.card-template').prepend(cardElement);

//   closePopup (popupAddCard);
// }

// formPopupPlace.addEventListener('submit', handleSubmitAdd);



const formValidatorProfile = new FormValidator(config, formChageProfile);
formValidatorProfile.enableValidation();

const formValidatorAddCard = new FormValidator(config, formAddCard);
formValidatorAddCard.enableValidation();