export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card-template__element')
      .cloneNode(true);

    return cardTemplate;
  }

  _setEventListenerCard() {
    this._cardLike.addEventListener('click', () => {
      this._cardLike.classList.toggle('card-template__like_active');
    });
  
    this._cardDelete.addEventListener('click', () => {
      this._element.remove();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card-template__image');
    this._cardTitle = this._element.querySelector('.card-template__title');
    this._cardLike = this._element.querySelector('.card-template__like');
    this._cardDelete = this._element.querySelector('.card-template__delete');

    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._setEventListenerCard();
           
    return this._element;
  }
}
