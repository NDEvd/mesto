export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card-template__element')
      .cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.card-template__image').src = this._link;
    this._element.querySelector('.card-template__title').textContent = this._name;
    this._element.querySelector('.card-template__title').alt = this._name;

    this._element.querySelector('.card-template__like').addEventListener('click', () => {
      this._element.querySelector('.card-template__like').classList.toggle('card-template__like_active');
    });
    
    this._element.querySelector('.card-template__delete').addEventListener('click', () => {
      this._element.remove();
    });

    this._element.querySelector('.card-template__image').addEventListener('click', () => {
      document.querySelector('.popup_type_image').classList.add('popup_opened');
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { 
          document.querySelector('.popup_type_image').classList.remove('popup_opened'); 
        }
      });
      document.querySelector('.popup__image').src = this._link;
      document.querySelector('.popup__image').alt = this._name;
      document.querySelector('.popup__image-title').textContent = this._name;
    });
    
    return this._element;
  }
}
