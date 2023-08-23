export default class Section {
  constructor (renderer, containerSelector) {
    // this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

    renderItems(items) {
      items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element, position) {
    switch (position) {
      case 'append':
        this._container.append(element);
        break;
      case 'prepend':
        this._container.prepend(element);
        break;
      default:
        break  
    }
  }
}