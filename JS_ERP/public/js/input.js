document.addEventListener("DOMContentLoaded", () => {
  const btnSave = document.querySelector("button.save");
  const btnList = document.querySelector("button.list");
  btnSave?.addEventListener("click", () => {
    const bInputs = document.querySelectorAll("input");
    for (const tag of bInputs) {
      const value = tag.value;
      if (!value) {
        alert(`값을 입력해 주세요\n"${tag.title}"`);
        tag.select();
        return false;
      }
    }
    document.querySelector("form.data").submit();
  });
  btnList?.addEventListener("click", () => {
    document.location.href = "/list";
  });
});
