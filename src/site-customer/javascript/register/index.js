const nameInput = document.querySelector('.form__input-name');
const emailInput = document.querySelector('.form__input-email');
const passwordInput = document.querySelector('.form__input-password');

export default function handleRegister() {
  const listUser = JSON.parse(localStorage.getItem('list_user')) || [];
  const message = passwordInput.nextElementSibling;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const nameValue = nameInput.value;
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  let index = 0;

  if (nameValue.trim() && nameValue.trim().length > 3 && passwordValue.length >= 8 && emailRegex.test(emailValue)) {
    const formData = {
      id: index + 1,
      name: nameValue,
      email: emailValue,
      password: md5(passwordValue),
    };

    console.log(listUser);

    const userExisted = listUser.filter(({ name, email }) => name === nameValue || email === emailValue);

    if (userExisted.length > 0) {
      passwordInput.classList.add('error');
      message.innerText = 'Tài khoản đã tồn tại.';
      return;
    }

    listUser.push(formData);

    const token = btoa(JSON.stringify(formData));

    localStorage.setItem('token', token);
    localStorage.setItem('status_login', true);
    localStorage.setItem('user', JSON.stringify({ name: nameValue, avatar: null }));
    localStorage.setItem('list_user', JSON.stringify(listUser));

    setTimeout(() => localStorage.removeItem('token'), 60 * 60 * 24 * 1000);
    window.location.href = '/';
  }
  console.log(1);
}
