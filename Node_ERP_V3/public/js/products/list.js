document.addEventListener("DOMContentLoaded", () => {
  const btnInsert = document.querySelector("button.products.insert");
  const tableList = document.querySelector("table.products.List");

  btnInsert?.addEventListener("click", () => {
    document.location.href = "/products/insert";
  });
});
