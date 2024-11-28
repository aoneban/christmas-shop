import '../scss/styles.scss';
import { data } from './data';
import { ProductCard } from './product';

(function () {
  const classValue = document.querySelector('.gifts');
  classValue.classList.add('addition');
})();

/* start burger-menu open */

function launchBurgerMenu() {
  const burger = document.getElementById('burger');
  const content = document.querySelector('.overlay-content');

  burger.addEventListener(
    'click',
    (function () {
      let flag = false;

      return function () {
        window.addEventListener('resize', () => {
          if (window.innerWidth > 768) {
            close();
          }
        });
        content.addEventListener('click', (event) => {
          if (event.target) {
            close();
          }
        });

        function open() {
          burger.classList.add('change');
          document.getElementById('myNav').style.width = '100%';
          document.body.style.overflow = 'hidden';
          flag = true;
        }

        function close() {
          burger.classList.remove('change');
          document.getElementById('myNav').style.width = '0';
          document.body.style.overflow = 'visible';
          flag = false;
        }

        return !flag ? open() : close();
      };
    })()
  );
}
launchBurgerMenu();

/* finish burger-menu open */

/* start generate products*/

function generateProducts() {
  const products = document.querySelector('.gifts__products');
  data.forEach((elem) => {
    let product = new ProductCard(
      elem.name,
      elem.color,
      elem.image,
      elem.category
    );
    let prodView = product.createProductCard();
    products.append(prodView);
  });
}

generateProducts();

/* finish generate products*/

/* start sort product cards */

const buttons = document.querySelector('.main__gifts-sort');
buttons.addEventListener('click', (event) => {
  const oldActiveButtons = document.querySelectorAll('.btn-action');
  oldActiveButtons.forEach((el) => el.classList.remove('active'));

  const currentButton = event.target;
  const currentButtonValue = currentButton.textContent;

  const products = document.querySelectorAll('.gifts__products-wrapper');

  products.forEach((elem) => {
    currentButton.classList.add('active');

    if (elem.classList.contains('hidden')) elem.classList.remove('hidden');
    const paragraph = elem.querySelector('.gifts__products-name p');
    const currentElement = paragraph.textContent.toLowerCase();

    if (currentButtonValue !== currentElement) {
      elem.classList.add('hidden');
    }
    if (currentButtonValue === 'All') {
      elem.classList.remove('hidden');
    }
  });
});

/* finish sort product cards */