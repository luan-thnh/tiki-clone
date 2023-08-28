import handleLogin from '../login/index.js';
import handleRegister from '../register/index.js';
import { validate } from '../../../constants/validate/index.js';

const form = document.querySelector('#form');
const inputName = document.querySelector('.form__input-name');
const inputPassword = document.querySelector('.form__input-password');
const inputEmail = document.querySelector('.form__input-email');
const btnSubmit = document.querySelector('.form__btn-submit');

const inputs = [inputName, inputPassword, inputEmail];
const { NAME_LENGTH, PASSWORD_LENGTH, EMAIL_REGEX } = validate;

function checkInputRequired(input) {
  if (!input.value.trim()) {
    input.classList.add('error');
    const message = input.nextElementSibling;
    message.innerText = `${input.placeholder} không được bỏ trống.`;
  }
}

function checkNameLength(input) {
  if (input.value.trim().length > NAME_LENGTH) {
    input.classList.remove('error');
    const message = input.nextElementSibling;
    message.innerText = '';
  } else {
    input.classList.add('error');
    const message = input.nextElementSibling;
    message.innerText = 'Tên tài khoản phải có ít nhất 4 ký tự.';
  }
}

function checkEmailFormat(input) {
  const emailRegex = EMAIL_REGEX;

  if (emailRegex.test(input.value)) {
    input.classList.remove('error');
    const message = input.nextElementSibling;
    message.innerText = '';
  } else {
    input.classList.add('error');
    const message = input.nextElementSibling;
    message.innerText = 'Email không đúng định dạng.';
  }
}

function checkPasswordLength(input) {
  if (input.value.length >= PASSWORD_LENGTH) {
    input.classList.remove('error');
    const message = input.nextElementSibling;
    message.innerText = '';
  } else {
    input.classList.add('error');
    const message = input.nextElementSibling;
    message.innerText = 'Mật khẩu phải có ít nhất 8 ký tự.';
  }
}

inputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    if (input === inputName) {
      checkNameLength(input);
    } else if (input === inputEmail) {
      checkEmailFormat(input);
    } else if (input === inputPassword) {
      checkPasswordLength(input);
    }

    checkInputRequired(input);
  });
});

inputs.forEach((input) => {
  input.addEventListener('blur', (e) => {
    if (input === inputName) {
      checkNameLength(input);
    } else if (input === inputEmail) {
      checkEmailFormat(input);
    } else if (input === inputPassword) {
      checkPasswordLength(input);
    }

    checkInputRequired(input);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  inputs.forEach((input) => {
    if (input === inputName) {
      checkNameLength(input);
    } else if (input === inputEmail) {
      checkEmailFormat(input);
    } else if (input === inputPassword) {
      checkPasswordLength(input);
    }

    checkInputRequired(input);
  });

  if (btnSubmit.innerText.toLowerCase() === 'đăng nhập') handleLogin(PASSWORD_LENGTH, EMAIL_REGEX);
  if (btnSubmit.innerText.toLowerCase() === 'đăng ký') handleRegister(NAME_LENGTH, PASSWORD_LENGTH, EMAIL_REGEX);
});

setTimeout(() => localStorage.removeItem('token'), 60 * 60 * 24 * 1000);
