document.addEventListener("DOMContentLoaded", () => {
  const mainNav = document.querySelector("nav.main");

  mainNav?.addEventListener("click", (tag) => {
    const navItem = tag.target;
    if (navItem?.tagName === "LI") {
      let url = "";
      switch (navItem.textContent) {
        case "Home":
          url = "/";
          break;
        case "거래처관리":
          url = "/buyer";
          break;
        case "로그아웃":
          if (!confirm("로그아웃 할까요?")) {
            return false;
          }
          url = "/users/logout";
          break;
      }
      document.location.href = url;
    }
  });
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
