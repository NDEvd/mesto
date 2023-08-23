export default class Card {
  constructor(data, templateSelector, userId, handleCardDelete, handleCardClick, {handleLike}) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLike = handleLike;
    // console.log(this._userId);
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
    this._cardImage = this._element.querySelector('.card-template__image');
    this._cardTitle = this._element.querySelector('.card-template__title');
    this._cardLike = this._element.querySelector('.card-template__like');
    this._cardCounterLike = this._element.querySelector('.card-template__counter');
    this._cardDelete = this._element.querySelector('.card-template__delete');

    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    // this._cardCounterLike.textContent = this._data.likes.length;
    // this._updateLike();
    this.setLikes(this._data);
    this._setEventListenerCard();
     
    if (this._userId !== this._data.owner._id) {
      this._cardDelete.remove();
    }
    
    return this._element;
  }

  // _toggleLike(){
  //   this._cardCounterLike.textContent = this._data.likes.length;
  //   this._cardLike.classList.toggle('card-template__like_active');
  // }

  _updateLike() {
    this._cardCounterLike.textContent = this._data.likes.length;
    if (this.isLiked()) {
      this._cardLike.classList.add('card-template__like_active');
    } else {
      this._cardLike.classList.remove('card-template__like_active');
    }
  }

  _setEventListenerCard() {
    this._cardLike.addEventListener('click', () => {
      this._handleLike(this);
    });
  
    // здесь должен открываться второй попап
    // this._cardDelete.addEventListener('click', () => {
    //   this._deleteCard();
    // });
    if (this._userId === this._data.owner._id) {
      // this._cardDelete.addEventListener('click', () => this._popupInstance.openPopup(this))
      this._cardDelete.addEventListener('click', () => this._handleCardDelete(this))
    }

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }


  getId() {
    return this._data._id;
  }

  deleteCard(){
    this._element.remove();
  }

  isLiked() {
    return this._data.likes.some((item) => {
    // console.log(item._id);
      return  item._id === this._userId;
    
    })
  }

  setLikes(data) {
    this._data.likes = data.likes;
    this._updateLike();
  }
}
