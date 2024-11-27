import '../scss/styles.scss';

/* start timer*/

document.addEventListener('DOMContentLoaded', function () {

  const deadline = new Date(2024, 11, 31, 23, 59, 59);

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

const burger = document.getElementById('burger');
const content = document.querySelector('.overlay-content');
burger.addEventListener(
  'click',
  (function () {
    let flag = false;

    return function () {
      window.addEventListener('resize', () => {
        if(window.innerWidth > 768) {
          close();
        }
      })
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

/* end burger-menu open */