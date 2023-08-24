import Popup from "./Popup.js";

export default class PopupWithConfirmDelete extends Popup {
  constructor(popupSelector, handleCardSubmit = null) {
    super(popupSelector);
    
    this._formElement = this.popup.querySelector('.popup__form');
    this._handleCardSubmit = handleCardSubmit;
  }

  setActionSubmit(callback) {
    this._handleCardSubmit = callback;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleCardSubmit();
      console.log('карточка удалена');
    })
  }
}