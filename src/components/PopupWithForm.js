import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupElement = document.querySelector(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }


  closePopup() {
    super.closePopup();
    this._formElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.closePopup();
    });
  }
}