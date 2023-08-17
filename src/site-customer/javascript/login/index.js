const emailInput = document.querySelector('.form__input-email');
const passwordInput = document.querySelector('.form__input-password');

let LIST_USER_DATA = JSON.parse(localStorage.getItem('list_user')) || [];

export default function handleLogin() {
  const listUser = LIST_USER_DATA;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const message = passwordInput.nextElementSibling;

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  if (passwordValue.length >= 8 && emailRegex.test(emailValue)) {
    const user = listUser.filter(({ email }) => email === emailValue);

    if (!user || user.length === 0) {
      passwordInput.classList.add('error');
      message.innerText = 'Tài khoản không tồn tại.';
      return;
    }

    const [{ id, name, email, password }] = user;

    if (emailValue === email && md5(passwordValue) === password) {
      const token = btoa(JSON.stringify({ name, email }));

      passwordInput.classList.remove('error');
      message.innerText = '';

      localStorage.setItem('token', token);
      localStorage.setItem('status_login', true);
      localStorage.setItem('user', JSON.stringify({ id: id, name, avatar: null }));

      window.location.href = '/';
    } else if (emailValue !== email || md5(passwordValue) !== password) {
      passwordInput.classList.add('error');
      message.innerText = 'Email hoặc mật khẩu của bạn không dúng.';
    } else {
      passwordInput.classList.add('error');
      message.innerText = 'Tài khoản không tồn tại.';
    }
  }
}
