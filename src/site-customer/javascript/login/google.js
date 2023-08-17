function handleCredentialResponse(response) {
  if (response.credential) {
    let jwt = response.credential;
    let user = JSON.parse(atob(jwt.split('.')[1]));

    const { name, picture } = user;
    const nameCovert = decodeURIComponent(escape(name));

    localStorage.setItem('status_login', true);
    localStorage.setItem('token', jwt);
    localStorage.setItem('user', JSON.stringify({ name: nameCovert, avatar: picture }));
    window.location.href = '/';
  }
}

function handleLogout() {
  google.accounts.id.disableAutoSelect();
  google.accounts.id.prompt();
}

window.addEventListener('load', function init() {
  google.accounts.id.initialize({
    client_id: '238884745342-650aknj2sod1rqhnksalqefvscmvl6ua.apps.googleusercontent.com',
    auto_select: false,
    callback: handleCredentialResponse,
  });

  google.accounts.id.renderButton(document.getElementById('sign-in'), { theme: 'outline', size: 'large', width: 300 });
});
