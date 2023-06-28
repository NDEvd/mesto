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

const popupChageButton = page.querySelector('#popup-chage-button');
const popupAddButton = page.querySelector('#popup-add-button');
const popupImage = page.querySelector('#popup-image');

const buttonChange = page.querySelector('.profile__change-button');
const buttonAdd = page.querySelector('.profile__add-button');

const inputName = popupChageButton.querySelector('#name');
const inputProfession = popupChageButton.querySelector('#profession');
const inputTitle = popupAddButton.querySelector('#title');
const inputPlace = popupAddButton.querySelector('#place');

const profileName = page.querySelector('.profile__name');
const profileProfession = page.querySelector('.profile__profession');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function handleProfilPopup () {
  let event = new Event('input');
  openPopup(popupChageButton);
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  inputName.dispatchEvent(event);
}

buttonChange.addEventListener('click', handleProfilPopup);

function handlePlacePopup () {
  openPopup(popupAddButton);
  inputTitle.value = '';
  inputPlace.value = '';
}

buttonAdd.addEventListener('click', handlePlacePopup);

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

popupChageButton.querySelector('.popup__close-icon').addEventListener('click', () => {
  closePopup (popupChageButton)
});
popupAddButton.querySelector('.popup__close-icon').addEventListener('click', () => {
  closePopup (popupAddButton)
});

popupChageButton.addEventListener('click', closeOverlay);
popupAddButton.addEventListener('click', closeOverlay);
popupImage.addEventListener('click', closeOverlay);

function closeOverlay(event) {
  if (event.currentTarget === event.target) {
    closePopup (event.currentTarget);
}
};

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 27) {
    closePopup (popupChageButton);
    closePopup (popupAddButton);
    closePopup (popupImage);
  }
});

const formPopupProfile = popupChageButton.querySelector('.popup__form');
const formPopupPlace = popupAddButton.querySelector('.popup__form');

function handleFormSubmit (evt) {
  evt.preventDefault();
   
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup (popupChageButton);
}

formPopupProfile.addEventListener('submit', handleFormSubmit); 

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

function renderCard(date, container) {
  container.append(createCard(date));
}

initialCards.forEach (function (item) {
  renderCard(item, container);
});
 
function handleSubmitAdd (evt) {
  evt.preventDefault();
  
  const newCards = {
    name: inputTitle.value,
    link: inputPlace.value
  };

  renderNewCard(newCards, container);
  closePopup (popupAddButton);
}

function renderNewCard(date, container) {
  container.prepend(createCard(date));
}

formPopupPlace.addEventListener('submit', handleSubmitAdd);