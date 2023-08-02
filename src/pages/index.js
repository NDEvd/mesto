import './index.css';

import { initialCards,
   config,
   formChageProfile,
   formAddCard,
   inputName,
   inputProfession,
   buttonChangeProfile,
   buttonAddCard
   } from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo';


buttonAddCard.addEventListener('click', () => {
  popupAddCardInstance.openPopup();
  formValidatorAddCard.disabledButtonSave();
  formValidatorAddCard.resetErrorStyle();
});

buttonChangeProfile.addEventListener('click', () => {
  popupChageProfileInstance.openPopup();
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


function createCard(item) {
  const card = new Card(item, '#card-template', handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

const cardInital = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElementInital = createCard(item);
    cardInital.addItem(cardElementInital, 'append');
  }
}, '.card-template');

cardInital.renderItems();


const popupAddCardInstance = new PopupWithForm({
  popupSelector: '#popup-add-button',
  handleFormSubmit: (data) => {
    cardInital.addItem(createCard({
      name: data.title,
      link: data.place
    }), 'prepend');
    popupAddCardInstance.closePopup();
  }
});
popupAddCardInstance.setEventListeners();


const userInfo = new UserInfo ({
  nameSelector: '.profile__name',
  professionSelector: '.profile__profession'
})

const popupChageProfileInstance = new PopupWithForm({
  popupSelector: '#popup-chage-button',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    popupChageProfileInstance.closePopup();
  }
});
popupChageProfileInstance.setEventListeners();


const formValidatorProfile = new FormValidator(config, formChageProfile);
formValidatorProfile.enableValidation();

const formValidatorAddCard = new FormValidator(config, formAddCard);
formValidatorAddCard.enableValidation();