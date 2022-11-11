document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav.main");
  nav?.addEventListener("click", (tag) => {
    const target = tag.target;
    if (target.tagName === "LI") {
      const navText = target.textContent;
      let href1 = ["/", "/주문관리", "/list", "/상품관리", "/user/login"];
      let data = ["Home", "주문관리", "거래처관리", "상품관리", "로그인"];
      data.forEach((data, index) => {
        switch (navText) {
          case data:
            document.location.href = href1[index];
            break;
        }
      });
    }
  });
});
