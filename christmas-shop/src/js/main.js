import '../scss/styles.scss';

const burger = document.getElementById('burger');
burger.addEventListener('click', () => {
  burger.classList.toggle('change');
});
