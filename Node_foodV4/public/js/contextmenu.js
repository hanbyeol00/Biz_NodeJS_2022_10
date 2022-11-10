document.addEventListener("DOMContentLoaded", () => {
  const tTable = document.querySelector("table.today");
  tTable?.addEventListener("contextmenu", (tag) => {
    const target = tag.target;
    if (target.tagName === "TD") {
      const pTR = target.closest("TR");
      const t_seq = pTR.dataset.seq;
      document.querySelector("input[name='t_seq']").value = t_seq;
      let click = confirm("삭제하겠습니까?");
      if (click) {
        document.querySelector("form.today").submit();
        alert("삭제되었습니다");
      } else {
        alert("취소하였습니다");
      }
    }
  });
});
