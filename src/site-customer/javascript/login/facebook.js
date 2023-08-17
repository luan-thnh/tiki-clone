const avatarHeader = document.querySelector('.header__info');

function statusChangeCallback(response) {
  if (response.status === 'connected') {
    const token = response.authResponse.accessToken;

    localStorage.setItem('status_login', true);
    localStorage.setItem('token', token);
    getProfileUser();
  } else {
    console.log('Please log ' + 'into this webpage.');
  }
}

function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function () {
  FB.init({
    appId: '671711861574693',
    cookie: true,
    xfbml: true,
    version: 'v17.0',
  });

  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
};

function getProfileUser() {
  FB.api('/me?fields=id,name,email,picture', function (response) {
    const {
      name,
      picture: {
        data: { url },
      },
    } = response;

    const nameCovert = decodeURIComponent(escape(name));

    localStorage.setItem('user', JSON.stringify({ name: nameCovert, avatar: url }));
    window.location.href = '/';
  });
}
