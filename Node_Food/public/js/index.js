document.addEventListener("DOMContentLoaded", () => {
  const btnSubmit = document.querySelector("button.submit");
  btnSubmit?.addEventListener("click", () => {
    const inputs = document.querySelectorAll("form.fd_input input");
    const name = inputs[1];
    const eat = inputs[2];
    const kcal = inputs[3];
    if (!name.value) {
      alert("식품명을 입력해주세요");
      name.focus();
      return false;
    }
    if (!eat.value) {
      alert("섭취량을 입력해주세요");
      eat.focus();
      return false;
    }
    if (!kcal.value) {
      alert("칼로리 입력해주세요");
      kcal.focus();
      return false;
    }
    document.querySelector("form.fd_input").submit();
  });
});
