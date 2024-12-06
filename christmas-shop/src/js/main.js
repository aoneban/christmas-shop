import '../scss/styles.scss';
import { data } from './data';
import { ProductCard } from './product';

/* start timer*/

document.addEventListener('DOMContentLoaded', function () {
  const deadline = new Date(Date.UTC(2024, 11, 31, 23, 59, 59));

  let timerId = null;

  function countdownTimer() {
    const difference = deadline - new Date();
    if (difference <= 0) {
      clearInterval(timerId);
    }
    const days =
      difference > 0 ? Math.floor(difference / 1000 / 60 / 60 / 24) : 0;
    const hours =
      difference > 0 ? Math.floor(difference / 1000 / 60 / 60) % 24 : 0;
    const minutes =
      difference > 0 ? Math.floor(difference / 1000 / 60) % 60 : 0;
    const seconds = difference > 0 ? Math.floor(difference / 1000) % 60 : 0;

    $days.textContent = days;
    $hours.textContent = hours;
    $minutes.textContent = minutes;
    $seconds.textContent = seconds;
  }

  const $days = document.querySelector('.timer__days');
  const $hours = document.querySelector('.timer__hours');
  const $minutes = document.querySelector('.timer__minutes');
  const $seconds = document.querySelector('.timer__seconds');

  countdownTimer();

  timerId = setInterval(countdownTimer, 1000);
});

/* end timer*/

/* start burger-menu open */

function launchBurgerMenu() {
  const burger = document.getElementById('burger');
  const content = document.querySelector('.overlay-content');
  const modal = document.getElementById('myModal');
  const myNav = document.getElementById('myNav');
  const body = document.body;
  const TABLET_SIZE = 768;

  burger.addEventListener(
    'click',
    (function () {
      let flag = false;

      return function () {
        window.addEventListener('resize', checkTabletSize);

        content.addEventListener('click', (event) => {
          if (event.target) {
            closeBurgerPanel();
          }
        });

        function checkTabletSize() {
          if (window.innerWidth > TABLET_SIZE) {
            closeBurgerPanel();
          }
        }

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

/* end burger-menu open */

/* start random gallery */

function showRandomProductCards() {
  const getRandomNumber = () => {
    let totalCardsWeNeed = 4;
    let totalCardsInArray = 36;
    const arrayRandomNumbers = [];

    while (arrayRandomNumbers.length < totalCardsWeNeed) {
      let singleRandomFigure = Math.floor(Math.random() * totalCardsInArray);
      if (!arrayRandomNumbers.includes(singleRandomFigure)) {
        arrayRandomNumbers.push(singleRandomFigure);
      }
    }
    return arrayRandomNumbers;
  };

  const random = getRandomNumber();
  const countOfCards = 4;
  const sliders = document.querySelector('.gifts__products');

  for (let i = 0; i < countOfCards; i += 1) {
    let product = new ProductCard(
      data[random[i]].name,
      data[random[i]].color,
      data[random[i]].image,
      data[random[i]].category,
      data[random[i]].description,
      data[random[i]].superpowers
    );
    let prodView = product.createProductCard();
    sliders.append(prodView);
  }
}

showRandomProductCards();

/* finish random gallery */

/* start slider */

(function () {
  function getDistanceToParent(element) {
    const elementRect = element.getBoundingClientRect();
    const parentRect = element.parentElement.getBoundingClientRect();
    const distanceTop = elementRect.top - parentRect.top;
    const distanceLeft = elementRect.left - parentRect.left;
    return { top: distanceTop, left: distanceLeft };
  }

  const arrowRight = document.getElementById('ar-right');
  const arrowLeft = document.getElementById('ar-left');
  const slider = document.querySelector('.slider__middle');

  let count = 0;
  let steps = 0;
  let totalSteps = 3;
  let spacing = 0;
  const paddings = 2;

  function updateSpacing() {
    count = 0;
    steps = 0;
    spacing = 0;

    slider.style.transform = 'translateX(0)';

    const distances = getDistanceToParent(slider);
    const addSpaces = distances.left * paddings;

    const gifts = document.getElementById('gifts');
    const widthOfSlider = slider.scrollWidth;
    const widthGiftsBlock = gifts.offsetWidth;

    widthGiftsBlock <= 768 ? (totalSteps = 6) : (totalSteps = 3);

    spacing = (widthOfSlider + addSpaces - widthGiftsBlock) / totalSteps;

    arrowLeft.disabled = true;
    arrowRight.disabled = false;
  }

  window.addEventListener('resize', updateSpacing);

  function initializeArrows() {
    arrowRight.addEventListener('click', function () {
      if (steps < totalSteps) {
        count += spacing;
        steps += 1;
        slider.style.transform = `translateX(-${count}px)`;
        arrowLeft.disabled = false;
      }
      if (steps >= totalSteps) {
        arrowRight.disabled = true;
      }
    });

    arrowLeft.addEventListener('click', function () {
      if (steps > 0) {
        count -= spacing;
        steps -= 1;
        if (Math.sign(count) === -1) {
          count = 0;
        }
        slider.style.transform = `translateX(-${count}px)`;
        arrowRight.disabled = false;
      }
      if (steps <= 0) {
        arrowLeft.disabled = true;
      }
    });

    arrowLeft.disabled = true;
  }

  window.onload = function () {
    setTimeout(() => {
      updateSpacing();
      initializeArrows();
    }, 100);
  };
})();

/* finish slider */
