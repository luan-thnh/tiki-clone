const btnOpens = document.querySelectorAll('.image-gallery__btn-open');
const btnClose = document.querySelector('.image-gallery__btn-close');
const gallery = document.querySelector('.image-gallery');
const btnPrev = document.querySelector('.image-gallery__btn-prev');
const btnNext = document.querySelector('.image-gallery__btn-next');
const sliderList = document.querySelector('.image-gallery__list');
const imageMain = document.querySelector('.product__info-image-main img');
const imageInfos = document.querySelectorAll('.product__info-image-list .product__info-image-item');
const imageReviews = document.querySelectorAll('.product__review-image-list .product__review-image-item');

let index = 0;
let lengthSliderList = imageInfos.length - 1;
const widthSliderList = sliderList.offsetWidth;

btnNext.onclick = () => {
  index = Math.min(index + 1, lengthSliderList);
  sliderList.style.transform = `translateX(-${widthSliderList * index}px)`;

  btnNext.classList.toggle('disable', index === lengthSliderList);
  btnPrev.classList.remove('disable');
};

btnPrev.onclick = () => {
  index = Math.max(index - 1, 0);
  sliderList.style.transform = `translateX(-${widthSliderList * index}px)`;

  btnPrev.classList.toggle('disable', index === 0);
  btnNext.classList.remove('disable');
};

btnPrev.classList.add('disable');

btnOpens.forEach((btnOpen) => {
  btnOpen.onclick = () => {
    gallery.classList.add('show');
    document.body.style.overflow = 'hidden';
  };
});

btnClose.onclick = () => {
  gallery.classList.remove('show');
  document.body.style.overflow = 'visible';
};

imageInfos.forEach((image) => {
  image.onclick = () => {
    const indexImage = Array.from(sliderList.children).findIndex((item) => item.getAttribute('data-image') === image.getAttribute('data-image'));

    index = +indexImage;

    btnNext.classList.toggle('disable', index === lengthSliderList);
    btnPrev.classList.remove('disable');

    sliderList.style.transform = `translateX(-${widthSliderList * index}px)`;

    const srcImageCurr = image.currentSrc;
    imageMain.src = srcImageCurr;

    imageInfos.forEach((image) => image.classList.remove('active'));
    image.classList.add('active');
  };
});

imageReviews.forEach((image) => {
  image.onclick = () => {
    const indexImage = Array.from(sliderList.children).findIndex(
      (item) => item.getAttribute('data-image-review') === image.getAttribute('data-image-review')
    );

    lengthSliderList = sliderList.children.length - 1;

    index = +indexImage;

    btnNext.classList.toggle('disable', index === lengthSliderList);
    btnPrev.classList.remove('disable');

    sliderList.style.transform = `translateX(-${widthSliderList * index}px)`;

    gallery.classList.add('show');
    document.body.style.overflow = 'hidden';
  };
});
