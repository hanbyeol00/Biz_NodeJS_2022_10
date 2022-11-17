document.addEventListener("DOMContentLoaded", () => {
  const btnInsert = document.querySelector("button.product.insert");
  const productList = document.querySelector("table.product.list");
  btnInsert?.addEventListener("click", () => {
    document.location.href = "/product/insert";
  });
  productList?.addEventListener("click", (tag) => {
    const td = tag.target;
    if (td?.tagName === "TD") {
      const tr = td.closest("TR");
      const pcode = tr.dataset.p_code;
      if (pcode) {
        // alert(bcode);
        document.location.href = `/product/detail/${pcode}`;
      }
    }
  });
});
