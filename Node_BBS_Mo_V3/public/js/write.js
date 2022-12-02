document.addEventListener("DOMContentLoaded", () => {
  const btnInput = document.querySelector("button.bbs.input");
  const btnList = document.querySelector("button.bbs.list");
  const formInput = document.querySelector("form.bbs.write");

  btnInput?.addEventListener("click", () => {
    const Inputs = document.querySelectorAll("input");
    const content = document.querySelector("textarea");
    for (const input of Inputs) {
      const tagTitle = input?.title && content?.title;
      if (tagTitle) {
        const value = input.value && content.value;
        if (!value) {
          alert(`필수 입력항목 입니다\n"${tagTitle}"`);
          input.select();
          return false;
        }
      }
    }
    // 유효성 검사 후
    formInput?.submit();
  });
  btnList?.addEventListener("click", () => {
    document.location.href = "/";
  });
});
