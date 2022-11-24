import express from "express";
import BBS from "../models/tbl_bbs.js";

// atlas 접속하기

// BBS(bbs 라는 이름으로) Collection 시작
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // bbs 데이터 전체 SELECT
    const bbsResult = await BBS.find();
    // SELECT 된 bbt 데이터(bbsResult)를
    // bbsList 변수에 담아서 index 에게 res
    return res.render("index", { bbsList: bbsResult });
  } catch (err) {
    return res.json(err);
  }
});

router.get("/insert", (req, res) => {
  res.render("write", { bbs: "" });
});

router.post("/insert", async (req, res) => {
  const newBBs = new BBS(req.body);

  try {
    await newBBs.save();
    res.redirect("/");
  } catch (err) {
    res.json(err);
  }
});

router.get("/detail/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await BBS.findById(id);
    res.render("detail", { bbs: result });
  } catch (err) {
    res.json(err);
  }
});

router.get("/update/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await BBS.findById(id);
    return res.render("write", { bbs: result });
  } catch (err) {}
});

router.post("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await BBS.updateOne({ _id: id }, { $set: req.body });
    return res.redirect(`/detail/${id}`);
  } catch (err) {
    return res.json(err);
  }
});

router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await BBS.findByIdAndDelete(id);
    return res.redirect("/");
  } catch (err) {
    res.json(err);
  }
});

/* GET home page. */
// new 키워드를 사용하여 MongoClient 클래스를 통하여
// client 객체를 생성하기
// mongoDB에 연결하기 위한 준비도구
router.get("/input", async (req, res, next) => {
  const bbsContent = {
    b_date: "2022-11-23",
    b_time: "09:36:00",
    b_writer: "981126",
    b_subject: "Mongoose게시판 시작",
    b_content: "Mongoose 게시판 프로젝트",
  };
  try {
    /**
     * bbsContent 데이터(JSON)를 사용하여
     * mongoose 모델객체 bbs 를 새로 생성하고
     * 모델객체 bbs 의 save() 함수를 호출하여
     * 데이터를 추가하기
     */
    const bbs = new BBS(bbsContent);
    const result = await bbs.save();
    return res.json(result);
  } catch (err) {
    return res.json(err);
  }

  // res.render("index", { title: "callor.com Express" });
});

export default router;
