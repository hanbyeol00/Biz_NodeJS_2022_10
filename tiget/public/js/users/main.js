// nav화면에서 이동과 login 모달창 띄우기

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const btnModal = document.getElementById("btn-modal");
  btnModal?.addEventListener("click", () => {
    modal.style.display = "flex";
  });
  const divbtn = document.querySelector("div.close-area");
  divbtn?.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
