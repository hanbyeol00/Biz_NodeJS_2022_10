import express from "express";
import { getBooks } from "../../modules/naver_module.js";
import { getMyBooks } from "../../modules/books_module.js";
import { BOOK_RES, NAVER_RES } from "../../config/api_res_code.js";
import Books from "../../modules/books_module.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  const search = req.query?.search;
  if (!search) return res.json(NAVER_RES.NOT_SEARCH);

  let resultBooks;
  try {
    resultBooks = await getBooks(search);
  } catch (e) {
    return res.json(JSON.parse(e.message));
  }

  return res.json(resultBooks);
});

router.get("/my/:username", async (req, res) => {
  const username = req.params.username;
  const myBooks = await getMyBooks({ username });
  return res.json(myBooks);
});

router.post("/insert", async (req, res) => {
  const {
    odate,
    username,
    isbn,
    title,
    link,
    image,
    author,
    discount,
    publisher,
  } = req.body;
  const user = username;
  const book = { isbn, title, link, image, author, discount, publisher, odate };
  book.price = Number(book.discount) / 0.9;

  await Books.bookInput(book, user);

  const myBooks = await getMyBooks({ username });
  return res.json(myBooks);

  // isbn 으로 다시 서버에 fetch 를 하여 도서정보를 받아오고
  // 그 정보를 tbl_books 에 insert

  // book 정보를 통째로 client 에서 받는다면
  // 그 정보를 그대로 tbl_books 에 insert
});

router.post("/input", (req, res) => {});

router.get("/detail/:isbn", (req, res) => {});

router.get("/user/:username", (req, res) => {});

export default router;
