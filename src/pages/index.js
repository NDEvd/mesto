import './index.css';

import { config,
  popupChageProfile,
  popupAddCard,
  popupChageAvatar,
  formChageProfile,
  formAddCard,
  formChageAvatar,
  inputName,
  inputProfession,
  buttonChangeProfile,
  buttonAddCard,
  buttonChangeAvatar,
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

buttonChangeAvatar.addEventListener('click', () => {
  popupChageAvatarInstance.openPopup();
  formValidatorAvatar.disabledButtonSave();
  formValidatorAvatar.resetErrorStyle();
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
    userInfo.setUserInfo(user);
    cardInital.renderItems(cards)
  })
  .catch(err => console.log(err))

  const userInfo = new UserInfo ({
    nameSelector: '.profile__name',
    professionSelector: '.profile__profession',
    avatarSelector: '.profile__foto'
  })

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

function loadData(isLoading, popupElement, ButtonText) {
  const popupButton = popupElement.querySelector('.popup__save');
  if (isLoading) {
    popupButton.textContent = 'Сохранение...';
} else {
  popupButton.textContent = ButtonText;
}
}

const popupAddCardInstance = new PopupWithForm({
  popupSelector: '#popup-add-button',
  handleFormSubmit: (data) => {
    loadData(true, popupAddCard, 'Создать');
    api.addNewCard(data)
      .then(dataFromServer => {
        const newCard = createCard(dataFromServer);
        cardInital.addItem(newCard, 'prepend');
        popupAddCardInstance.closePopup();
      })
      .catch((err) => console.log(err))
      .finally(() => loadData(false, popupAddCard, 'Создать'))
  }
});
popupAddCardInstance.setEventListeners();

const popupChageProfileInstance = new PopupWithForm({
  popupSelector: '#popup-chage-button',
  handleFormSubmit: (dataNewProfile) => {
    loadData(true, popupChageProfile, 'Сохранить');
    api.saveProfile(dataNewProfile)
    .then(dataNewProfile => {
      userInfo.setUserInfo(dataNewProfile);
      popupChageProfileInstance.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => loadData(false, popupAddCard, 'Сохранить'))
    }
  });
popupChageProfileInstance.setEventListeners();

const popupChageAvatarInstance = new PopupWithForm({
  popupSelector: '#popup-chage-avatar',
  handleFormSubmit: (avatarLinkFromForm) => {
    loadData(true, popupChageAvatar, 'Сохранить');
    api.saveAvatar(avatarLinkFromForm)
      .then(userInfoFromServer => {
        console.log('аватар установлен');
        userInfo.setUserAvatar(userInfoFromServer);
        popupChageAvatarInstance.closePopup();
      })
      .catch(err => console.log(err))
      .finally(() => loadData(false, popupAddCard, 'Сохранить')) 
  }
});
popupChageAvatarInstance.setEventListeners();

const popupConfirm = new PopupWithConfirmDelete('#popup-confirm-delete', null);
function handleCardDelete(cardInstance) {
  popupConfirm.openPopup();
  popupConfirm.setActionSubmit(() => {
    api.deleteCard(cardInstance.getId())
        .then(() => {
          cardInstance.deleteCard();
          popupConfirm.closePopup();
        })
        .catch((err) => console.log(err))
      });
}
popupConfirm.setEventListeners();

const formValidatorProfile = new FormValidator(config, formChageProfile);
formValidatorProfile.enableValidation();

const formValidatorAddCard = new FormValidator(config, formAddCard);
formValidatorAddCard.enableValidation();

const formValidatorAvatar = new FormValidator(config, formChageAvatar);
formValidatorAvatar.enableValidation();