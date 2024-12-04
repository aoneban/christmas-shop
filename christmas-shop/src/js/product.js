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

    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('img-wrapper');

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

    imgWrapper.append(img);
    gift.append(category, title);
    wrapper.append(imgWrapper, gift);
    return wrapper;
  }

  createModalCard() {
    const injectCart = this.cartTemplate();

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = this.description;

    const powersWrapper = document.createElement('div');
    powersWrapper.classList.add('powers-wrapper');

    const titlePower = document.createElement('h4');
    titlePower.classList.add('title-powers');
    titlePower.textContent = 'Adds superpowers to:';

    for (const prop in this.superpowers) {
      let countStarts = this.superpowers[prop].replace(/[+0]/g, '');
      const name = document.createElement('div');
      name.classList.add('price');
      name.innerHTML = `
      <table border="1" style="width: 100%"> 
        <tr> 
          <td class="fixed-size size-one">${prop}</td> 
          <td class="fixed-size size-two">${this.superpowers[prop]}</td> 
          <td class="fixed-size size-three">
          <img src="../../${countStarts}.png" alt="Image">
          </td> 
        </tr> 
      </table>
      `;
      powersWrapper.append(name);
    }

    const modal = document.createElement('div');
    modal.setAttribute('id', 'myModal');
    modal.setAttribute('class', 'modal');
    modal.style.display = 'block';

    const close = document.createElement('button');
    close.classList.add('close');

    const closeImg = document.createElement('img');
    closeImg.src = '../../close.png';

    const content = document.createElement('div');
    content.classList.add('modal-content');

    close.append(closeImg);

    wrapper.append(injectCart, description, titlePower, powersWrapper, close);

    content.append(wrapper);
    modal.append(content);
    document.body.style.overflow = 'hidden';
    document.body.appendChild(modal);

    modal.querySelector('.close').addEventListener('click', this.closeModal);

    window.addEventListener('resize', () => {
      const modal = document.getElementById('myModal');
      if (modal) {
        document.body.style.overflow = 'hidden';
      }
    });

    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        this.closeModal();
      }
    });

    return modal;
  }

  closeModal() {
    const modal = document.getElementById('myModal');
    document.body.style.overflow = 'visible';
    document.body.removeChild(modal);
  }

}
