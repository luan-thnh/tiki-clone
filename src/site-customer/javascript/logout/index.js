window.addEventListener('load', () => {
  const btnLogout = document.querySelector('.header__btn-logout');


  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      localStorage.removeItem('status_login');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('product_current');
      google.accounts.id.disableAutoSelect();
      window.location.href = '/login';
    });
  }
});
