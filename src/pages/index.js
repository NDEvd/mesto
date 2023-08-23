import './index.css';

import { config,
   formChageProfile,
   formAddCard,
   formConfirmDelete,
   inputName,
   inputProfession,
   buttonChangeProfile,
   buttonAddCard,
   configApi
   } from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmDelete from '../components/PopupWithConfirmDelete.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api(configApi);
// console.log(api);

buttonAddCard.addEventListener('click', () => {
  popupAddCardInstance.openPopup();
  formValidatorAddCard.disabledButtonSave();
  formValidatorAddCard.resetErrorStyle();
});

buttonChangeProfile.addEventListener('click', () => {
  popupChageProfileInstance.openPopup();
  const userInfoProfile = userInfo.getUserInfo()
  inputName.value = userInfoProfile.name;
  inputProfession.value = userInfoProfile.about;
  formValidatorProfile.enabledButtonSave();
  formValidatorProfile.resetErrorStyle();
});

const popupImageFromClass = new PopupWithImage('#popup-image');
popupImageFromClass.setEventListeners();

function handleCardClick(linkImage, titleImage) {
  popupImageFromClass.openPopup(linkImage, titleImage);
}

let userId = null;

api.getAllInfo()
  .then(([user, cards]) => {
    userId = user._id;
    cardInital.renderItems(cards);
    userInfo.setUserInfo(user)
  })
  .catch(err => console.log(err))

function createCard(item) {
  const card = new Card(item, '#card-template', userId, handleCardDelete, handleCardClick, {
     handleLike: (instance) => {
      api.counteLike(instance.getId(), instance.isLiked())
      .then(dataCardFromServer => instance.setLikes(dataCardFromServer))
      .catch((err) => console.log(err))
    }
  });


  const cardElement = card.generateCard();

  return cardElement;
}

const cardInital = new Section(
   (item) => {
    const cardElementInital = createCard(item);
    cardInital.addItem(cardElementInital, 'append')}, '.card-template');

api.getInitialCards().then(dataCards => cardInital.renderItems(dataCards))
  .catch((err) => console.log(err))

api.getProfile().then(dataProfile => userInfo.setUserInfo(dataProfile))
  .catch((err) => console.log(err))


const popupAddCardInstance = new PopupWithForm({
  popupSelector: '#popup-add-button',
  handleFormSubmit: (data) => {
    api.addNewCard(data)
      .then(dataFromServer => {
        const newCard = createCard(dataFromServer);
        cardInital.addItem(newCard, 'prepend');
        popupAddCardInstance.closePopup();
      })
      .catch((err) => console.log(err))
  }
});
popupAddCardInstance.setEventListeners();


const userInfo = new UserInfo ({
  nameSelector: '.profile__name',
  professionSelector: '.profile__profession'
})

const popupChageProfileInstance = new PopupWithForm({
  popupSelector: '#popup-chage-button',
  handleFormSubmit: (dataNewProfile) => {
    api.saveProfile(dataNewProfile)
    .then(dataNewProfile => {
      userInfo.setUserInfo(dataNewProfile);
      popupChageProfileInstance.closePopup();
    })
    .catch((err) => console.log(err))
    }
  });
popupChageProfileInstance.setEventListeners();


function handleCardDelete() {
const popupConfirm = new PopupWithConfirmDelete('#popup-confirm-delete', (cardInstance) => {
    api.deleteCard(cardInstance.getId())
    .then(() => {
      cardInstance.remove();
      popupConfirm.closePopup();
    })
    .catch((err) => console.log(err))
  });
popupConfirm.openPopup();
popupConfirm.setEventListeners();
}



const formValidatorProfile = new FormValidator(config, formChageProfile);
formValidatorProfile.enableValidation();

const formValidatorAddCard = new FormValidator(config, formAddCard);
formValidatorAddCard.enableValidation();

