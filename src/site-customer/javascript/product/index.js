window.addEventListener('load', () => {
  const DATA_PRODUCT = JSON.parse(localStorage.getItem('data_product'));
  const DATA_CATAGORIES = JSON.parse(localStorage.getItem('data_categories'));

  const productList = document.querySelector('.card__list');
  const banner = document.querySelector('.card__banner');
  const checkDetail = document.querySelector('#detail');
  const categoryList = document.querySelector('.home__categories');
  const outstandingList = document.querySelector('.home__outstanding');

  function renderCategories(categories) {
    const keyCategory = Object.keys(categories);
    const htmlCategory = [];

    keyCategory.forEach((key) => {
      htmlItem = categories[key]
        .map(
          ({ id, name, icon }) => `
            <a href="#!" class="home__sidebar-link" title="${name}" data-category="${id}">
                <img src="${icon}" alt="" class="home__sidebar-icon" />
                <span class="home__sidebar-text">${name}</span>
            </a>
          `
        )
        .join('');

      htmlCategory.push(htmlItem);
    });

    if (categoryList) categoryList.innerHTML = htmlCategory[1];
    if (outstandingList) outstandingList.innerHTML = htmlCategory[0];
  }

  renderCategories(DATA_CATAGORIES);

  let start = 0;
  let end = 20;

  function loadItems(startItem, endItem) {
    const arrayClone = [...DATA_PRODUCT];
    const arraySlice = arrayClone.slice(startItem, endItem);

    let html = arraySlice
      .map(
        ({ id, name_product, image_url, rating, sold_product, price_product, discount_product, delivery_day }) => `
      <a href="/details" class="card__item" data-id="${id}">
        <div class="card__item-thumbnail">
          <img
            src="${image_url}"
            alt=""
          />
        </div>
        <div class="card__item-content">
          <p class="card__item-title">${name_product}</p>
          <div class="card__item-rating-count">
            <div class="card__item-rating">
              <span>${rating}</span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                size="14"
                color="#fdd836"
                height="14"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
                style="color: rgb(253, 216, 54)"
              >
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                ></path>
              </svg>
            </div>
            <div class="card__item-count">Đã bán ${sold_product}</div>
          </div>
          <p class="card__item-price ${discount_product !== '0%' ? 'discount' : ''}">
            ${price_product.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
            ${
              discount_product !== '0%' ? `<span class="card__item-price--discount">-${discount_product}</span>` : ''
            }</p>
        </div>
        <div class="card__item-footer">
          <p>${delivery_day}</p>
        </div>
      </a>
  `
      )
      .join('');

    productList.innerHTML = html;

    handleClickProductItem();
  }

  loadItems(start, end);

  let productListRectTop = parseInt(productList.getBoundingClientRect().top);
  if (checkDetail) banner.style.width = '1222px';

  function toggleFixedBanner(scrollY) {
    if (scrollY >= productListRectTop) banner.classList.add('fixed');
    if (scrollY < productListRectTop + 20) banner.classList.remove('fixed');
  }

  window.onscroll = () => {
    const scrollY = window.scrollY;

    toggleFixedBanner(scrollY);

    if (window.scrollY + window.innerHeight >= productList.offsetHeight) loadItems(start, (end += 20));
  };

  function handleClickProductItem() {
    const cards = document.querySelectorAll('.card__item');

    cards.forEach((card) => {
      card.onclick = () => {
        const cardId = card.getAttribute('data-id');
        const arrayClone = [...DATA_PRODUCT];

        const detailItem = arrayClone.filter(({ id }) => +cardId === id)[0];

        localStorage.setItem('product_current', JSON.stringify(detailItem));
      };
    });
  }
});
