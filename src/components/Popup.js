export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeIcon = this._popup.querySelector('#close-icon');
    this._closePopupByEsc = this._closePopupByEsc.bind(this);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closePopupByEsc);
  }
  
  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closePopupByEsc);
  }
  
  _closePopupByEsc(e) {
    if (e.key === 'Escape') { 
      this.closePopup(); 
    } 
  }

  setEventListeners() {
    this._closeIcon.addEventListener('click', () => {
      this.closePopup();
      });

    this._popup.addEventListener('click', (event) => {
      if (event.currentTarget === event.target) {
        this.closePopup();
      }
    });
  }
}