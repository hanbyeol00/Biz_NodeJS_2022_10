document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav.main");
  nav?.addEventListener("click", (tag) => {
    const navTarget = tag.target;
    if (navTarget.tagName === "LI") {
      const navText = navTarget.textContent;
      let href1 = ["/", "/", "/", "/", "/user/login"];
      let data = ["Home", "123", "123", "123", "로그인"];
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
