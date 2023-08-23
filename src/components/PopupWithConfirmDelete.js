import Popup from "./Popup.js";

export default class PopupWithConfirmDelete extends Popup {
  constructor(popupSelector, handleCardSabmit) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._handleCardSabmit = handleCardSabmit;
    this._card = {};
  }

  openPopup(card) {
    super.openPopup();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleCardSabmit(this._card);
      console.log('карточка удалена');
    })
  }
}