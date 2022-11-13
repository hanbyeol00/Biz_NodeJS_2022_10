document.addEventListener("DOMContentLoaded", () => {
  const tableDetail = document.querySelector("table.list");
  tableDetail?.addEventListener("click", (tag) => {
    const target = tag.target;
    const pTR = target.closest("TR");
    const b_id = pTR.dataset.id;
    if (target.tagName === "TD") {
      document.location.href = `/detail/${b_id}`;
    }
  });
});
