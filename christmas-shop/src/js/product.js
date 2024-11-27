export class ProductCard {
    constructor(name, color, image, category) {
      this.name = name;
      this.color = color;
      this.image = image;
      this.category = category;
    }
    createProductCard() {
      const wrapper = document.createElement('div');
      wrapper.classList.add('gifts__products-wrapper');
  
      const img = document.createElement('img');
      img.src = this.image;
      img.setAttribute('alt', this.name);
  
      const gift = document.createElement('div');
      gift.classList.add('gifts__products-name');
  
      const category = document.createElement('p');
      category.textContent = this.category;
      category.style.color = this.color;
  
      const title = document.createElement('h4');
      title.textContent = this.name;
  
      gift.append(category, title);
      wrapper.append(img, gift);
  
      return wrapper;
    }
  }