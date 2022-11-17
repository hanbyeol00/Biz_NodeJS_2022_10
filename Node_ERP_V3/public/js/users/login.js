document.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.querySelector("button.user.login");
  const inputUserName = document.querySelector("input[name='username']");
  const inputPassword = document.querySelector("input[name='password']");

  btnLogin?.addEventListener("click", () => {
    const username = inputUserName.value;
    const password = inputPassword.value;

    if (!username) {
      alert("USER NAME 을 입력하세요");
      inputUserName.select();
      return false;
    }
    if (!password) {
      alert("비밀번호를 입력하세요");
      inputPassword.select();
      return false;
    }
    document.querySelector("form.login").submit();
  });
});
