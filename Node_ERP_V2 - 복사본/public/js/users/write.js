document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("button.write.insert");
  btn?.addEventListener("click", () => {
    document.querySelector("form.category").submit();
  });
});
