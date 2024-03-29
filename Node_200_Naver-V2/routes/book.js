import express from "express";
import { getBooks } from "../modules/naver_module.js";
import Books from "../modules/books_module.js";
import DB from "../models/index.js";
// import { Op } from "sequelize";

const BOOKS = DB.models.tbl_books;
const MY_BOOKS = DB.models.tbl_mybooks;
const USERS = DB.models.tbl_users;

const router = express.Router();

router.get("/", async (req, res) => {
  const search = req.query.search;
  if (!search) {
    return res.render("book/list", { BOOKS: [] });
  }

  /**
   * getBooks() 함수에서 throw new Error() 가 실행되면
   * getBooks() 함수를 호출하는 아래의 코드에서 Exception 이 발생한다
   * 발생한 Exception 을 여기에서 처리(try catch)한다
   */
  try {
    const book_List = await getBooks(search);
    return res.render("book/list", { BOOKS: book_List });
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
});

router.get("/detail/:isbn", async (req, res) => {
  const result = await getBooks(req.params.isbn);
  const book = result[0];
  book.price = Number(book.discount) / 0.9;

  return res.render("book/detail", { BOOK: book });
});

router.post("/insert", async (req, res) => {
  const user = {
    username: "han",
    password: "1234",
    u_level: 0,
    u_nickname: "길동",
    u_name: "홍길동",
  };
  const book = req.body;

  // 도서정보를 books_module.js 의 bookInput() 에게 이전하기
  try {
    await Books.bookInput(book, user);
  } catch (e) {
    console.log(e);
    return res.json({ msg: "오류 발생", error: e });
  }

  res.redirect("/book");
});

export default router;
