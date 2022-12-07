import express, { query } from "express";
import upload from "../modules/file_upload.js";
import DB from "../models/index.js";
import moment from "moment";
import sequelize from "sequelize";
import { QueryTypes } from "sequelize";
const dateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm:ss";
const Board = DB.models.board_detail;
const User = DB.models.user;
const IntGen = DB.models.genre_of_interest;

const router = express.Router();

router.get("/join", (req, res) => {
  res.render("users/join");
});
router.get("/join/register", (req, res) => {
  res.render("users/register");
});
router.get("/bltBrd", async (req, res) => {
  res.redirect("/users/bltBrd/page/1");
});
router.get("/bltBrd/page/:page", async (req, res) => {
  let pageNum = req.params.page; // 요청 페이지 넘버
  let offset = 0;
  const limit = 17;

  const lists = await Board.findAll({
    where: { sort_board: "공지사항" },
    limit: 3,
  });

  const countSql =
    "SELECT count(*) FROM board_detail WHERE sort_board NOT IN ('공지사항')";
  const totalCount = await Board.sequelize.query(countSql, {
    type: QueryTypes.SELECT,
  });
  const totalPage = Math.ceil(totalCount / limit);

  console.log(totalPage);

  if (pageNum > 1) {
    offset = limit * (pageNum - 1);
  }
  const sql = `SELECT * FROM board_detail ORDER BY sort_board = "공지사항" asc limit ${limit} offset ${offset}`;
  const boards = await Board.sequelize.query(sql, {
    type: QueryTypes.SELECT,
  });
  const boardsList = boards.filter((category) => {
    return category.sort_board != "공지사항";
  });
  res.render("users/bltBrd", {
    lists,
    boardsList,
    body: "all",
  });
});

router.get("/bltBrd/Notice", async (req, res) => {
  const lists = await Board.findAll({ where: { sort_board: "공지사항" } });
  res.render("users/bltBrd", { lists, body: "Notice" });
});
router.get("/bltBrd/category/:category", async (req, res) => {
  const category = req.params.category;
  console.log(category);
  const lists = await Board.findAll({
    where: { sort_board: "공지사항" },
    limit: 3,
  });
  const boards = await Board.findAll({ where: { sort_board: category } });
  res.render("users/bltBrd", { lists, boards, body: category });
});
router.get("/bltBrd/detail", (req, res) => {
  res.render("users/detail");
});
router.get("/bltBrd/write", (req, res) => {
  res.render("users/write");
});
router.post(
  "/bltBrd/write",
  upload.single("c_image_file"),
  async (req, res) => {
    const { b_title, sort_board, b_content } = req.body;
    const date = moment().format(dateFormat);
    const time = moment().format(timeFormat);
    const b_update_date = date + " " + time;
    const item = {
      b_title,
      sort_board,
      b_content,
      b_img: req?.file?.filename,
      b_nickname: "익명",
      b_update_date,
    };
    try {
      await Board.create(item);
      res.redirect("/users/bltBrd");
    } catch (err) {
      console.error(err);
      res.send("SQL 오류");
    }
  }
);

router.post("/login", async (req, res) => {
  const { user_id, user_pw } = req.body;
  console.log({
    user_id,
    user_pw,
  });
  const userInfo = await User.findAll({ where: { username: user_id } });
  const pw = userInfo.password;
  console.log(userInfo);
  if (user_pw === pw) {
    req.session.user = {
      username: user_id,
      real_name: userInfo.realname,
      nick_name: userInfo.nickname,
      user_role: userInfo.level,
    };
    req.session.save(() => {
      res.redirect("/");
    });
  } else {
    const loginFail = {
      status: "USERNAME",
    };
    res.redirect("http://localhost:3002/main");
  }
});

router.get("/logout", (req, res) => {
  var session = req.session;
  try {
    if (session.user) {
      req.session.destroy((err) => {
        if (err) console.error(err);
      });
    }
  } catch (err) {
    return console.error(err);
  }
  return res.redirect("/main");
});

router.post("/join/register", async (req, res) => {
  const joinInfo = req.body;
  joinInfo.level = 3;
  const userGenre = req.body.genre;

  // 유저-장르 테이블에 넣을 데이터이다
  const genreArray = userGenre.map((genre) => {
    const genreModel = {
      username: req.body.username,
      genre_code: genre,
    };
    return genreModel;
  });
  // console.log(joinInfo);
  try {
    const userUpload = await User.create(joinInfo);
    const genreUpload = await IntGen.bulkCreate(genreArray);
  } catch (err) {
    return console.error(err);
  }
  return res.redirect("/main");
});
export default router;
