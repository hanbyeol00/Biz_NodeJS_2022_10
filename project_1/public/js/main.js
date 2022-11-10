document.addEventListener("DOMContentLoaded", () => {
  const divURL = document.querySelectorAll("div.download");
  divURL?.addEventListener("click", (tag) => {
    const target = tag.target;
    if (target.tagName === "DIV") {
      const divName = target.textContent;
      let data = ["안드로이드", "아  이  폰"];
      data.forEach((data) => {
        switch (divName) {
          case data:
            document.location.href = "/123";
            break;
        }
      });
    }
  });
});
