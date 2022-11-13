document.addEventListener("DOMContentLoaded", () => {
  const btnInsert = document.querySelector("button.insert");
  btnInsert?.addEventListener("click", () => {
    document.location.href = "/write";
  });
});
