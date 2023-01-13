import express from "express";
import NAVER from "../config/naver_config.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const search = req.query.search;
  console.log(search);
  if (!search) {
    return res.send("검색어를 입력해야 합니다");
  }

  const naverFetchOption = {
    method: "GET",
    headers: {
      [NAVER.CLIENT_ID.KEY]: NAVER.CLIENT_ID.VALUE,
      [NAVER.CLIENT_SECRET.KEY]: NAVER.CLIENT_SECRET.VALUE,
    },
  };
  const queryString = `${NAVER.BOOK_URL_JSON}?query=${search}`;

  let response = null;
  try {
    response = await fetch(queryString, naverFetchOption);
  } catch (err) {
    console.log("fetch error", err);
    return res.json(response.json());
  }

  let result = null;
  try {
    result = await response.json();
  } catch (err) {
    console.log("JSON변환 오류", err);
    return res.send("JSON 변환 과정에서 문제발생");
  }

  // return res.json(result);

  return res.render("book/list", { BOOKS: result.items });
});

export default router;
