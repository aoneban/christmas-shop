import '../scss/styles.scss';

export class ProductCard {
  constructor(name, color, image, category, description, superpowers) {
    this.name = name;
    this.color = color;
    this.image = image;
    this.category = category;
    this.description = description;
    this.superpowers = superpowers;
  }

  createProductCard() {
    const card = this.cartTemplate();
    card.addEventListener('click', this.createModalCard.bind(this));
    return card; 
  }

  cartTemplate() {
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

  createModalCard() {

    const injectCart = this.cartTemplate();

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    const description = document.createElement('p');
    description.textContent = this.description;

    const modal = document.createElement('div');
    modal.setAttribute('id', 'myModal');
    modal.setAttribute('class', 'modal');
    modal.style.display = 'block';

    const close = document.createElement('span');
    close.classList.add('close');
    close.innerHTML = '&times;';

    const content = document.createElement('div');
    content.classList.add('modal-content');

    wrapper.append(injectCart, close)

    content.append(wrapper, description);
    modal.append(content);
    document.body.appendChild(modal);

    const closeModal = () => {
      document.body.removeChild(modal);
    };
    modal.querySelector('.close').addEventListener('click', closeModal);

    return modal;
  }
}
