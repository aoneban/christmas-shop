import '../scss/styles.scss';
import { data } from './data';
import { ProductCard } from './product';

/* start timer*/

document.addEventListener('DOMContentLoaded', function () {
  const deadline = new Date(Date.UTC(2024, 11, 31, 23, 59, 59));

  let timerId = null;

  function countdownTimer() {
    const diff = deadline - new Date();
    if (diff <= 0) {
      clearInterval(timerId);
    }
    const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    $days.textContent = days < 10 ? days : days;
    $hours.textContent = hours < 10 ? hours : hours;
    $minutes.textContent = minutes < 10 ? minutes : minutes;
    $seconds.textContent = seconds < 10 ? seconds : seconds;
    $days.dataset.title = 'days';
    $hours.dataset.title = 'hours';
    $minutes.dataset.title = 'minutes';
    $seconds.dataset.title = 'seconds';
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
          const modal = document.getElementById('myModal')
          burger.classList.remove('change');
          document.getElementById('myNav').style.width = '0';
          if(!modal) {
            document.body.style.overflow = 'visible';
          }
          flag = false;
        }

        return !flag ? open() : close();
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
  const sliders = document.querySelector('.gifts__products');
  for (let i = 0; i < 4; i += 1) {
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

  let count = 0;
  let steps = 0;
  let totalSteps = 3;
  let spacing = 0;

  function updateSpacing() {
    count = 0;
    steps = 0;
    spacing = 0;
    document.querySelector('.slider__middle').style.transform = 'translateX(0)';

    const slider = document.querySelector('.slider__middle');
    const distances = getDistanceToParent(slider);
    const addSpaces = distances.left * 2
    console.log('отступы :', (addSpaces / 2) + 10)

    const gifts = document.getElementById('gifts');
    const widthOfSlider = slider.scrollWidth;
    const widthGiftsBlock = gifts.offsetWidth;
    if (widthGiftsBlock <= 768) {
      totalSteps = 6;
    } else {
      totalSteps = 3;
    }
    spacing = (widthOfSlider + addSpaces - widthGiftsBlock) / totalSteps;

    arrowLeft.disabled = true;
    arrowRight.disabled = false;
  }

  window.addEventListener('resize', updateSpacing);

  function initializeArrows() {
    updateSpacing();

    arrowRight.addEventListener('click', function () {
      if (steps < totalSteps) {
        count += spacing;
        steps += 1;
        document.querySelector(
          '.slider__middle'
        ).style.transform = `translateX(-${count}px)`;
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
        document.querySelector(
          '.slider__middle'
        ).style.transform = `translateX(-${count}px)`;
        arrowRight.disabled = false;
      }
      if (steps <= 0) {
        arrowLeft.disabled = true;
      }
    });

    arrowLeft.disabled = true;
  }

  initializeArrows();
})();

window.addEventListener('resize', () => {
  const modal = document.getElementById('myModal')
  if(modal) {
    document.body.style.overflow = 'hidden'
  }
})
/* finish slider */
