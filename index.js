const page = document.querySelector('.page');
const changebutton = page.querySelector('.profile__change-button');

const popup = page.querySelector('.popup');

changebutton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

const closeicon = page.querySelector('.popup__close-icon');

closeicon.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

const inputname = page.querySelector('#name');
const inputprofession = page.querySelector('#profession');

const profilename = page.querySelector('.profile__name');
const profileprofession = page.querySelector('.profile__profession');

inputname.value = profilename.textContent;
inputprofession.value = profileprofession.textContent;

const formpopup = page.querySelector('.popup__container');

function handleFormSubmit (evt) {
  evt.preventDefault(); 
   
  profilename.textContent = inputname.value;
  profileprofession.textContent = inputprofession.value;
  popup.classList.remove('popup_opened');
}

formpopup.addEventListener('submit', handleFormSubmit); 