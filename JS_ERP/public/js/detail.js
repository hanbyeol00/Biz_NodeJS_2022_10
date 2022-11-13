document.addEventListener("DOMContentLoaded", () => {
  const btnUp = document.querySelector("button.update");
  const btnDle = document.querySelector("button.delete");
  const th = document.querySelector("th.detail1.id");
  const thId = th?.textContent;
  btnUp?.addEventListener("click", () => {
    document.location.href = `/write/${thId}`;
  });
  btnDle?.addEventListener("click", () => {
    document.querySelector("input[name='b_id']").value = thId;
    let click = confirm("삭제하겠습니까?");
    if (click) {
      document.querySelector("form.delete").submit();
      alert("삭제되었습니다");
    } else {
      alert("취소하였습니다");
    }
  });
});
