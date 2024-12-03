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
          myNav.style.width = '100%';
          body.style.overflow = 'hidden';
          flag = true;
        }

        function close() {
          burger.classList.remove('change');
          myNav.style.width = '0';
          if (!modal) {
            body.style.overflow = 'visible';
          }
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

    const category = product.querySelector('.gifts__products-name p').textContent.toLowerCase();
    
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
  let flagHeight = false;
  let flagWidth = false;

  document.addEventListener('DOMContentLoaded', () => {
    let startWidthWindow = window.innerWidth;

    if (startWidthWindow <= 768) {
      flagWidth = true;
    }
  });

  const button = document.getElementById('scroller');

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 300) {
      flagHeight = true;
    } else {
      flagHeight = false;
    }
    if (flagHeight && flagWidth) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  });

  window.addEventListener('resize', () => {
    let width = window.innerWidth;
    if (width <= 768) {
      flagWidth = true;
    } else if (width >= 769) {
      flagWidth = false;
    }
    if (flagHeight && flagWidth) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  });

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
})();

/* finish scroll button */
