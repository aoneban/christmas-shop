import '../scss/styles.scss';

(function () {
  const classValue = document.querySelector('.gifts');
  classValue.classList.add('addition');
})();

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
