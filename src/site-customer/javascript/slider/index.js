$('.slider__one').slick({
  dots: true,
  infinite: true,
  speed: 1000,
  autoplay: true,
  slidesToShow: 1,
  adaptiveHeight: true,
  prevArrow: `
    <button type='button' class='slick-prev slick-arrow slider__arrow slider__arrow-prev'>
      <img src="/assets/images/arrow-left-white-icon.png" alt="" />
    </button>`,
  nextArrow: `
    <button type='button' class='slick-next slick-arrow slider__arrow slider__arrow-next'>
      <img src="/assets/images/arrow-left-white-icon.png" alt="" />
    </button>`,
});
