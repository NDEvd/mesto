const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePopup(popup);
    }
  });
}

function resetErrorStyle (popup, firstInput, secondInput) {
  const error = popup.querySelectorAll('.popup__error');
  const errorArray = Array.from(error);
  errorArray.forEach((item) => {
    item.innerText = '';
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
const buttonSaveCard = popupAddCard.querySelector('.popup__save');

function handleCardPopup () {
  openPopup(popupAddCard);
  inputTitle.value = '';
  inputPlace.value = '';
  disabledButtonSave(buttonSaveCard, config);
  resetErrorStyle (popupAddCard, inputTitle, inputPlace);
  // const error = popupAddCard.querySelectorAll('.popup__error');
  // const errorArray = Array.from(error);
  // errorArray.forEach((item) => {
  //   item.innerText = '';
  // });
  // inputTitle.classList.remove('popup__input_type_error');
  // inputPlace.classList.remove('popup__input_type_error');
  // console.log(errorArray);
}

buttonAddCard.addEventListener('click', handleCardPopup);

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePopup(popup);
    }}
  )};

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
};



const formPopupProfile = popupChageProfile.querySelector('.popup__form');
const formPopupPlace = popupAddCard.querySelector('.popup__form');

function handleFormSubmitProfile (evt) {
  evt.preventDefault();
   
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup (popupChageProfile);
}

formPopupProfile.addEventListener('submit', handleFormSubmitProfile); 

const container = page.querySelector('.card-template');

const cardTemplate = page.querySelector('#card-template').content.querySelector('.card-template__element');

const popupBigImage = page.querySelector('.popup__image');
const popupTitleImage = page.querySelector('.popup__image-title');

function createCard( {name, link} ) {
  const card = cardTemplate.cloneNode(true);
  
  const templateImage = card.querySelector('.card-template__image');
  const templateTitle = card.querySelector('.card-template__title');
  const templateLike = card.querySelector('.card-template__like');
  const templateDelete = card.querySelector('.card-template__delete');
  
  templateImage.src = link;
  templateImage.alt = name;
  templateTitle.textContent = name;

    function likeCard () {
    templateLike.classList.toggle('card-template__like_active');
  }

  templateLike.addEventListener('click', likeCard);

  function deleteCard () {
    card.remove();
  }

  templateDelete.addEventListener('click', deleteCard);

  templateImage.addEventListener('click', () => {
    openPopup(popupImage);
    popupBigImage.src = link;
    popupBigImage.alt = name;
    popupTitleImage.textContent = name;
  });

  return card;
}

popupImage.querySelector('.popup__close-open-image').addEventListener('click', () => {
  closePopup (popupImage);
});

function renderInitialCard(date, container) {
  container.append(createCard(date));
}

initialCards.forEach (function (item) {
  renderInitialCard(item, container);
});
 
function handleSubmitAdd (evt) {
  evt.preventDefault();
  
  const newCards = {
    name: inputTitle.value,
    link: inputPlace.value
  };

  renderNewCard(newCards, container);
  closePopup (popupAddCard);
}

function renderNewCard(date, container) {
  container.prepend(createCard(date));
}

formPopupPlace.addEventListener('submit', handleSubmitAdd);