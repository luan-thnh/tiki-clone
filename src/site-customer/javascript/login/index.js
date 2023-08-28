const LIST_USER_DATA = JSON.parse(localStorage.getItem('list_user')) || [];

const emailInput = document.querySelector('.form__input-email');
const passwordInput = document.querySelector('.form__input-password');

export default function handleLogin(PASSWORD_LENGTH, EMAIL_REGEX) {
  const message = passwordInput.nextElementSibling;

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  if (passwordValue.length >= PASSWORD_LENGTH && EMAIL_REGEX.test(emailValue)) {
    const userCurr = LIST_USER_DATA.filter(({ email }) => email === emailValue);

    if (!userCurr || userCurr.length === 0) {
      passwordInput.classList.add('error');
      message.innerText = 'Tài khoản không tồn tại.';
      return;
    }

    const [{ id, name, email, password }] = userCurr;

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
