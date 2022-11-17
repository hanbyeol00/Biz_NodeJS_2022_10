document.addEventListener("DOMContentLoaded", () => {
  const updataBtn = document.querySelector("button.product.update");
  const deleteBtn = document.querySelector("button.product.delete");
  const buttonBox = document.querySelector("article.detail.button");
  buttonBox?.addEventListener("click", (tag) => {
    const button = tag.target;
    if (button.tagName === "BUTTON") {
      const pcode = button.closest("article")?.dataset.p_code;
      //   alert(button.classList);
      const classlist = Array.from(button.classList);
      let url = "/product";
      if (classlist.indexOf("update") > 0) {
        // alert(`update${bcode}`);
        url += `/update/${pcode}`;
        // location.href : GTE method 로 새로운 페이지를 요청하기
        // 현재 보이는 화면이 뒤로 밀리고 새로운 페이지가 열린다
        document.location.href = url;
      } else if (classlist.indexOf("delete") > 0) {
        if (!confirm("정말로 삭제 하겠습니까?")) {
          return false;
        }
        // alert(`삭제${bcode}`);
        url += `/delete/${pcode}`;
        // location.replace() 함수 : 현재 화면(페이지)를 url 페이로 덮어쓰기
        // 뒤로가기를 할때 이 페이지를 건너 뛴다
        // 현재 보고있는 detail 데이터가 삭제 되었는데
        // 뒤로가기를 했을때 다시 detail 화면이 나타나는 것은 매우 어색하다
        // 이럴때는 replace() 함수를 사용한다
        document.location.replace(url);
      }
    }
  });

  //   updataBtn?.addEventListener("click", () => {
  //     const parents = updataBtn.closest("article");
  //     const bcode = parents.dataset.bcode;
  //     alert(bcode);
  //   });
});
