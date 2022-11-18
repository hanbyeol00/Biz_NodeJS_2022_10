document.addEventListener("DOMContentLoaded", () => {
  const pass = document.querySelector("input[name='password']");
  const passchk = document.querySelector("input[name='password_check']");
  const pwdResult = document.querySelector("div.input_box.input");

  pass.addEventListener("change", (e) => {
    let passNow = e.target.value;
    if (passNow) {
      alert(passNow);
    }
  });
});
