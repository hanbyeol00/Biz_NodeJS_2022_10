import DB from "../models/index.js";
// import { Op } from "sequelize";
import { BOOK_RES } from "../config/api_res_code.js";

const BOOKS = DB.models.tbl_books;
const MY_BOOKS = DB.models.tbl_mybooks;

export const bookInput = async (book, username) => {
  // 만약 사용자정보(username) 값이 없으면 더이상 진행하지 말기
  // 호출하는 쪽에서 if(!bookInput()) ... 이러한 코드는 return null, return false 가
  // 동일한 효과를 낸다
  if (!username) return null;

  const my_book = {
    my_username: username, // 로그인 정보가 없으면 null 값
    my_isbn: book.isbn,
    my_odate: book.odate,
    my_opice: book.discount,
  };

  try {
    await BOOKS.create(book);
  } catch (err) {
    console.log("Book Create", err);
    try {
      await BOOKS.update(book, { where: { isbn: book.isbn } });
    } catch (err) {
      console.log("Book Update", err);
      throw new Error(JSON.stringify(BOOK_RES.BOOK_NOT_CREATE));
    }
  }

  try {
    await MY_BOOKS.create(my_book);
  } catch (err) {
    console.log("MyBook Create", err);
    try {
      await MY_BOOKS.update(my_book, {
        where: {
          my_isbn: my_book.my_isbn,
          my_username: my_book.my_username,
        },
      });
    } catch (e) {
      console.log("MyBook Update", e);
      throw new Error(JSON.stringify(BOOK_RES.MY_BOOK_NOT_CREATE));
    }
  }
};

export const getMyBooks = async (user) => {
  const username = user.username;
  let myBooks = null;
  try {
    myBooks = await MY_BOOKS.findAll({
      where: { my_username: username },
      include: "my_isbn_tbl_book",
    });
  } catch (e) {
    console.log(e);
    throw new Error(BOOK_RES.MY_BOOK_NOT_FOUND);
  }

  // return myBooks;
  const myBooksInfo = myBooks.map((book) => {
    return book.my_isbn_tbl_book;
  });
  return myBooksInfo;
};

export default { bookInput, getMyBooks };
