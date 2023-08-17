const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal__container');
const btnOpens = document.querySelectorAll('.modal__btn-open');
const btnClose = document.querySelector('.modal__btn-close');
const overlay = document.querySelector('.overlay');

console.log(modalContainer);

modalContainer.onclick = (e) => e.stopPropagation();

btnClose.onclick = () => {
  modal.classList.remove('show');
  overlay.classList.remove('show');
};

btnOpens.forEach((btnOpen) => {
  btnOpen.onclick = () => {
    modal.classList.add('show');
    overlay.classList.add('show');
  };
});

modal.onclick = () => {
  modal.classList.remove('show');
  overlay.classList.remove('show');
};
