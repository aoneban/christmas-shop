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
  const modal = document.getElementById('myModal');
  const myNav = document.getElementById('myNav');
  const body = document.body;
  const tabletSize = 768;


  burger.addEventListener(
    'click',
    (function () {
      let flag = false;

      return function () {
        window.addEventListener('resize', () => {
          if (window.innerWidth > tabletSize) {
            closeBurgerPanel();
          }
        });
        content.addEventListener('click', (event) => {
          if (event.target) {
            closeBurgerPanel();
          }
        });

        function openBurgerPanel() {
          burger.classList.add('change');
          myNav.style.width = '100%';
          body.style.overflow = 'hidden';
          flag = true;
        }

        function closeBurgerPanel() {
          burger.classList.remove('change');
          myNav.style.width = '0';
          if (!modal) {
            body.style.overflow = 'visible';
          }
          flag = false;
        }

        return !flag ? openBurgerPanel() : closeBurgerPanel();
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
      elem.category,
      elem.description,
      elem.superpowers
    );
    let prodView = product.createProductCard();
    products.append(prodView);
  });
}

generateProducts();

/* finish generate products*/

/* start sort product cards */

function handleSortButtonClick(event) {
  deactivateOldButtons();

  const currentButton = event.target;
  const currentButtonValue = currentButton.textContent;
  currentButton.classList.add('active');

  filterProducts(currentButtonValue);
}

function deactivateOldButtons() {
  const oldActiveButtons = document.querySelectorAll('.btn-action');
  oldActiveButtons.forEach((button) => button.classList.remove('active'));
}

function filterProducts(currentButtonValue) {
  const products = document.querySelectorAll('.gifts__products-wrapper');

  products.forEach((product) => {
    if (currentButtonValue === 'All') {
      product.classList.remove('hidden');
      return;
    }

    const category = product
      .querySelector('.gifts__products-name p')
      .textContent.toLowerCase();

    if (currentButtonValue.toLowerCase() !== category) {
      product.classList.add('hidden');
    } else {
      product.classList.remove('hidden');
    }
  });
}

const buttons = document.querySelector('.main__gifts-sort');
buttons.addEventListener('click', handleSortButtonClick);

/* finish sort product cards */

/* start scroll button */

(function () {
  const button = document.getElementById('scroller');
  const tabletSize = 768;
  const startShowButton = 300;
  let flagForHeight = false;
  let flagForWidth = false;

  document.addEventListener('DOMContentLoaded', () => {
    let startWidthWindow = window.innerWidth;

    if (startWidthWindow <= tabletSize) {
      flagForWidth = true;
    }
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY >= startShowButton) {
      flagForHeight = true;
    } else {
      flagForHeight = false;
    }

    checkConditionsToShow();
  });

  window.addEventListener('resize', () => {
    let widthToShowButton = window.innerWidth;

    if (widthToShowButton <= tabletSize) {
      flagForWidth = true;
    } else if (widthToShowButton > tabletSize) {
      flagForWidth = false;
    }

    checkConditionsToShow();
  });

  function checkConditionsToShow() {
    if (flagForHeight && flagForWidth) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  }

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
})();

/* finish scroll button */
