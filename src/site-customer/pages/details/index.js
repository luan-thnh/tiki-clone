const PRODUCT_CURRENT = JSON.parse(localStorage.getItem('product_current'));
const LIST_CART = JSON.parse(localStorage.getItem('list_cart')) || [];
const USER = JSON.parse(localStorage.getItem('user')) || [];
const TOKEN = localStorage.getItem('token');

const btnBuy = document.querySelector('.product__info-btn-buy');
const inputQuantity = document.querySelector('.product__info-quantity-input');
const btnPlus = document.querySelector('.product__info-quantity-btn--plus');
const btnMinus = document.querySelector('.product__info-quantity-btn--minus');

const productCurrent = PRODUCT_CURRENT;
const listCart = LIST_CART;
const user = USER;

window.addEventListener('load', () => {
  handleAddQuantityProduct();
  handleClickBuyProduct();
});

function handleAddQuantityProduct() {
  const cartQuantity = document.querySelector('.header__cart-quantity');

  localStorage.setItem('list_cart', JSON.stringify(listCart));
  if (listCart.length > 0) {
    listProductUserOrder = listCart.filter((item) => item.user_name === user.name)[0].product;
    let sumQuantityProduct = listProductUserOrder.reduce((total, curr) => total + curr.quantity, 0);
    cartQuantity.innerHTML = sumQuantityProduct.toString();
  } else {
    cartQuantity.innerHTML = '0';
  }
}

function handleClickBuyProduct() {
  btnBuy.addEventListener('click', () => {
    if (!TOKEN) {
      window.location.href = '/login';

      btnAccount.classList.remove('login');
      btnAccount.href = '/login';
    }

    const quantity = parseInt(inputQuantity.value);

    const existingUserIndex = listCart.findIndex((item) => item.user_name === user.name);

    if (existingUserIndex !== -1) {
      const existingProductIndex = listCart[existingUserIndex].product.findIndex(
        (item) => item.id === productCurrent.id
      );

      if (existingProductIndex !== -1) {
        listCart[existingUserIndex].product[existingProductIndex].quantity += quantity;
      } else {
        listCart[existingUserIndex].product.push({
          ...productCurrent,
          quantity,
        });
      }
    } else {
      listCart.push({
        user_name: user.name,
        product: [
          {
            ...productCurrent,
            quantity,
          },
        ],
      });
    }

    handleAddQuantityProduct();
  });
}

function handleChangeQuantityProduct() {
  inputQuantity.addEventListener('keydown', (e) => {
    if ([' ', '-', '+', '*', '/'].includes(e.key)) {
      e.preventDefault();
    }
  });

  inputQuantity.addEventListener('focusout', (e) => {
    if (!e.target.value || !!parseInt(e.target.value) === false) {
      e.target.value = 1;
      btnPlus.classList.remove('disable');
      btnMinus.classList.add('disable');
    }

    if (e.target.value > productCurrent.limit_product) {
      e.target.value = productCurrent.limit_product;
      btnPlus.classList.add('disable');
      btnMinus.classList.remove('disable');
    }
  });

  btnPlus.addEventListener('click', () => {
    inputQuantity.value = parseInt(inputQuantity.value) + 1;
    btnMinus.classList.remove('disable');

    if (inputQuantity.value > productCurrent.limit_product) {
      btnPlus.classList.add('disable');
    }
  });

  btnMinus.addEventListener('click', () => {
    if (inputQuantity.value > 1) {
      inputQuantity.value = parseInt(inputQuantity.value) - 1;

      if (inputQuantity.value === '1') {
        btnMinus.classList.add('disable');
      }
    }
  });
}

handleChangeQuantityProduct();

function renderDetailItem(obj) {
  const name = document.querySelector('.product__info--heading');
  const price = document.querySelector('.product__info-price');
  const priceDiscount = document.querySelector('.product__info-price--discount');
  const deliveryTime = document.querySelector('.product__info-delivery-time');
  const deliveryPrice = document.querySelector('.product__info-delivery-price span');
  const imageMain = document.querySelector('.product__info-image-main img');
  const imageList = document.querySelector('.product__info-image-list');
  const galleryList = document.querySelector('.image-gallery__list');
  const starGroup = document.querySelector('.product__info-star');
  const soldProduct = document.querySelector('.product__info-sold');

  const {
    name_product,
    image_url,
    image_list,
    price_product,
    price_discount,
    delivery_day,
    delivery_price,
    discount_product,
    rating,
    sold_product,
  } = obj;

  name.innerHTML = name_product;
  deliveryTime.innerHTML = delivery_day;
  deliveryPrice.innerHTML = delivery_price.toLocaleString('vi', { style: 'currency', currency: 'VND' });
  imageMain.src = image_url;
  soldProduct.innerHTML = `Đã bán ${sold_product}`;

  if (price_product === price_discount) {
    price.classList.remove('discount');
    price.innerHTML = price_product.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    priceDiscount.innerHTML = '';
  } else {
    price.classList.add('discount');
    price.innerHTML = price_discount.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    priceDiscount.innerHTML = price_product.toLocaleString('vi', { style: 'currency', currency: 'VND' });
  }

  let htmlStarIcon = '';
  for (let i = 0; i < rating; i++) {
    htmlStarIcon += `
  <span class="product__info-star-icon">
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      size="16"
      color="#fdd836"
      style="color: #fdd836"
      height="16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      ></path>
    </svg>
  </span>
  `;
  }
  starGroup.innerHTML = htmlStarIcon;

  let htmlImageList = image_list
    .map(
      (imageItem, index) => `
          <img src="${imageItem}" alt="${name_product}"  class="product__info-image-item" data-image="${index + 1}"/>
    `
    )
    .join('');

  imageList.innerHTML = `
        <img src="${image_url}" alt="${name_product}"  class="product__info-image-item" data-image="0"/> ${htmlImageList}
  `;

  galleryList.innerHTML = `
  <img src="${image_url}" alt="${name_product}"  class="product__info-image-item" data-image="0"/> ${htmlImageList}
  <img
    src="https://source.unsplash.com/random/120x120?sig=1&products"
    alt="picsum.photos"
    class="product__review-image-item image-gallery__btn-open"
  data-image-review="0"
  />
  <img
    src="https://source.unsplash.com/random/120x120?sig=2&products"
    alt="picsum.photos"
    class="product__review-image-item image-gallery__btn-open"
  data-image-review="1"
  />
  `;
  imageMain.onclick = () => {};
}

renderDetailItem(PRODUCT_CURRENT);
