document.addEventListener("DOMContentLoaded", () => {
  const chkAll = document.querySelector("input.chk_all");
  const chkbox = document.querySelectorAll("input.terms");

  chkAll?.addEventListener("click", () => {
    chkbox.forEach((ck) => {
      ck.checked = chkAll.checked;
    });
  });
  chkbox?.forEach((ck) => {
    ck?.addEventListener("click", () => {
      let cht = 0;

      chkbox?.forEach((ck) => {
        if (ck.checked == true) cnt++;
      });
    });
    if (cnt == chkbox?.length) {
      chkAll.checked = true;
    } else {
      chkAll.checked = false;
    }
  });
});
