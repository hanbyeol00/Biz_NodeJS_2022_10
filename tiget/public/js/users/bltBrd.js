// 커뮤니티 화면에서 게시판 클릭시 구분을 위한 화면

document.addEventListener("DOMContentLoaded", () => {
  const liNotice = document.querySelector("li.Notice");
  const liAll = document.querySelector("li.all");
  const liConcert_review = document.querySelector("li.concert_review");
  const liConcert_hall_review = document.querySelector(
    "li.concert_hall_review"
  );
  const liFreeboard = document.querySelector("li.freeboard");
  const mainNav = document.querySelector("nav.main");
  const bltBrdList = document.querySelector("table.bltBrd.table");

  bltBrdList?.addEventListener("click", (tag) => {
    const td = tag.target;
    if (td.tagName === "TD") {
      const id = td.closest("TR").dataset.id;
      document.location.href = `http://localhost:3002/forum/board/${id}`;
    }
  });

  mainNav?.addEventListener("click", (tag) => {
    const navItem = tag.target;
    if (navItem?.tagName === "LI") {
      let data = [
        "전체보기",
        "공지사항",
        "공연후기",
        "공연장후기",
        "자유게시판",
      ];
      let href = [
        "/users/bltBrd",
        "/users/bltBrd/Notice",
        "/users/bltBrd/category/공연후기",
        "/users/bltBrd/category/공연장후기",
        "/users/bltBrd/category/자유게시판",
      ];
      data.forEach((data, index) => {
        switch (navItem.textContent) {
          case data:
            document.location.href = href[index];
            break;
        }
      });
    }
  });

  if (category == "all") {
    liAll.style.backgroundColor = "gray";
    liAll.style.color = "white";
  }
  if (category == "Notice") {
    liNotice.style.backgroundColor = "gray";
    liNotice.style.color = "white";
  }
  if (category == "공연후기") {
    liConcert_review.style.backgroundColor = "gray";
    liConcert_review.style.color = "white";
  }
  if (category == "공연장후기") {
    liConcert_hall_review.style.backgroundColor = "gray";
    liConcert_hall_review.style.color = "white";
  }
  if (category == "자유게시판") {
    liFreeboard.style.backgroundColor = "gray";
    liFreeboard.style.color = "white";
  }
});
