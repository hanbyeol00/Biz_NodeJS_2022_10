const tdClickHandlerV1 = (tag) => {
  const target = tag.target;
  if (target.tagName === "TD") {
    // tag 의 data-st_num 로 설정된 항목의 값을
    // 가져오는 코드
    const st_num = target.dataset.st_num;

    // alert(`클릭된 TD, ${st_num}`);
    document.location.href = `/student/detail/${st_num}`;
  }
};

const tdClickHandlerV2 = (tag) => {
  const target = tag.target; // TD 요소 getter
  // 선택된 td를 감싸고 있는 tr tag 요소를 다시 getter
  const parentTR = target.closest("TR");
  // tr 에 설정된 data-st_num 값 getter
  const st_num = parentTR.dataset.st_num;
  document.location.href = `/student/${st_num}/detail`;
};
document.addEventListener("DOMContentLoaded", () => {
  const foodTable = document.querySelector("table.today");
  foodTable?.addEventListener("click", tdClickHandlerV2);
});
