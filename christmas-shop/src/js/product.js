import '../scss/styles.scss';

export class ProductCard {
  constructor(name, color, image, category, description, superpowers) {
    this.name = name;
    this.color = color;
    this.image = image;
    this.category = category;
    this.description = description;
    this.superpowers = superpowers
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

    wrapper.addEventListener('click', this.createModalCard.bind(this));

    return wrapper;
  }

  createModalCard() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('gifts__modal-wrapper');

    const img = document.createElement('img');
    img.src = this.image;
    img.setAttribute('alt', this.name);

    const gift = document.createElement('div');
    gift.classList.add('gifts__products-name');

    const category = document.createElement('p');
    category.textContent = this.category;
    category.style.color = this.color;

    const description = document.createElement('p');
    description.textContent = this.description;

    const title = document.createElement('h4');
    title.textContent = this.name;

    gift.append(category, title, description);
    wrapper.append(img, gift);

    const modal = document.createElement('div');
    modal.setAttribute('id', 'myModal');
    modal.setAttribute('class', 'modal');
    modal.style.display = "block";

    const close = document.createElement('span');
    close.classList.add('close');
    close.innerHTML = '&times;';

    const content = document.createElement('div');
    content.classList.add('modal-content');

    content.append(wrapper);
    modal.append(content, close);
    document.body.appendChild(modal);

    const closeModal = () => {
      document.body.removeChild(modal);
    };
    modal.querySelector('.close').addEventListener('click', closeModal);

    return modal;
  }
}



