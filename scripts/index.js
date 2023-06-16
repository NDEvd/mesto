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

const changebutton = page.querySelector('.profile__change-button');
const addButton = page.querySelector('.profile__add-button');

const inputname = popupChageButton.querySelector('#name');
const inputprofession = popupChageButton.querySelector('#profession');
const inputtitle = popupAddButton.querySelector('#title');
const inputplace = popupAddButton.querySelector('#place');

const profilename = page.querySelector('.profile__name');
const profileprofession = page.querySelector('.profile__profession');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function handleProfilPopup () {
  openPopup(popupChageButton);
  inputname.value = profilename.textContent;
  inputprofession.value = profileprofession.textContent;
}

function handlePlacePopup () {
  openPopup(popupAddButton);
  inputtitle.value = 'Название';
  inputplace.value = 'Ссылка на картинку';
}

changebutton.addEventListener('click', handleProfilPopup);
addButton.addEventListener('click', handlePlacePopup);

function popupclose (popup) {
  popup.classList.remove('popup_opened');
}

popupChageButton.querySelector('.popup__close-icon').addEventListener('click', () => {
  popupclose (popupChageButton)
});
popupAddButton.querySelector('.popup__close-icon').addEventListener('click', () => {
  popupclose (popupAddButton)
});

const formpopup = popupChageButton.querySelector('.popup__container');
const formpopupPlace = popupAddButton.querySelector('.popup__container');

function handleFormSubmit (evt) {
  evt.preventDefault(); 
   
  profilename.textContent = inputname.value;
  profileprofession.textContent = inputprofession.value;
  popupChageButton.classList.remove('popup_opened');
}

formpopup.addEventListener('submit', handleFormSubmit); 

const container = page.querySelector('.card-template');

const cardTemplate = page.querySelector('#card-template').content.querySelector('.card-template__element');

function createCard( {name, link} ) {
  const card = cardTemplate.cloneNode(true);
  
  const templateImage = card.querySelector('.card-template__image');
  const templateTitle = card.querySelector('.card-template__title');
  const templateLike = card.querySelector('.card-template__like');
  const templateDelete = card.querySelector('.card-template__delete');
  const popupBigImage = page.querySelector('.popup__image');
  const popupTitleImage = page.querySelector('.popup__image-title');

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
    popupTitleImage.textContent = name;
  });

  popupImage.querySelector('.popup__close-open-image').addEventListener('click', () => {
    popupclose (popupImage);
  }); 

  return card;
}

function renderCard(date, container) {
  container.append(createCard(date));
}

initialCards.forEach (function (item) {
  renderCard(item, container);
});
 
function handleSubmitAdd (evt) {
  evt.preventDefault();
  
let newCards = {
    name: inputtitle.value,
    link: inputplace.value
  };

  function renderNewCard(date, container) {
    container.prepend(createCard(date));
  }
  renderNewCard(newCards, container);
  
popupAddButton.classList.remove('popup_opened');
}

formpopupPlace.addEventListener('submit', handleSubmitAdd);