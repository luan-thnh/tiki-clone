window.addEventListener('load', () => {
  const token = localStorage.getItem('token');
  const statusLogin = localStorage.getItem('status_login');
  const user = JSON.parse(localStorage.getItem('user'));

  const btnAccount = document.querySelector('.header__btn-account');
  const headerAvatar = document.querySelector('.header__info-avatar');
  const headerName = document.querySelector('.header__info-name');

  if (!token && window.location.pathname === '/cart') {
    window.location.href = '/login';

    btnAccount.classList.remove('login');
    btnAccount.href = '/login';
  }

  if (statusLogin && token) {
    btnAccount.classList.add('login');
    user.avatar
      ? (headerAvatar.children[0].src = user.avatar)
      : (headerAvatar.innerHTML = `<span>${user.name[0].toUpperCase()}</span>`);
    headerName.innerHTML = user.name;
  }
});
