import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageElement = this.popup.querySelector('.popup__image');
    this._titleElement = this.popup.querySelector('.popup__image-title');
  }

  openPopup(linkImage, titleImage) {
    super.openPopup();
    
    this._imageElement.src = linkImage;
    this._imageElement.alt = titleImage;
    this._titleElement.textContent = titleImage;
  }
}