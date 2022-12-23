import express from "express";
import DB from "../models/index.js";
import moment from "moment";
const router = express.Router();
const Todo = DB.models.tbl_todolist;
const dateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm:ss";

router.get("/", async (req, res) => {
  try {
    const todoList = await Todo.findAll();
    return res.json(todoList);
  } catch (err) {
    console.log(err);
    return res.json({ error: "select 오류" });
  }
});

router.get("/", (req, res) => {
  return res.send("단일데이터");
});

router.get("/insert", (req, res) => {
  return res.render("write");
});

/**
 * form 으로 부터 전달된 데이터를 DB table 에 추가하고
 * DB table 전체 리스트를 JSON 으로 응답하는 코드
 */
router.post("/insert", async (req, res, next) => {
  // form 에서 전수신된 입력데이터를 data 변수에 담고
  const data = req.body;
  try {
    // table 에 insert 수행
    await Todo.create(data);
    // 전체데이터를 select 하여
    // const todoList = await Todo.findAll();
    // // json type 으로 보내주기
    // return res.json(todoList);
    return next();
  } catch (err) {
    console.error(err);
    // 만약 오류가 발생하면 정해진 규칙대로 응답하기
    return res.json({ error: "SQL ERROR" });
  }
});

router.put("/complete/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByPk(id);
    await Todo.update(
      { ...todo, e_date: todo.e_date ? "" : moment().format(dateFormat) },
      { where: { id } }
    );
    // if (!todo.e_date) {
    //   await Todo.update(
    //     {
    //       e_date: moment().format(dateFormat),
    //       e_time: moment().format(timeFormat),
    //     },
    //     { where: { id } }
    //   );
    // } else {
    //   await Todo.update(
    //     {
    //       e_date: "",
    //       e_time: "",
    //     },
    //     { where: { id } }
    //   );
    // }
    return next();
  } catch (err) {
    return res.json({ err: "전송오류" });
  }
});

router.put("/update", async (req, res, next) => {
  const data = req.body;
  console.log(data);
  try {
    await Todo.update(data, { where: { id: data.id } });
    return next();
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    await Todo.destroy({ where: { id: id } });
    return next();
  } catch (err) {
    return res.json({ err: "삭제오류" });
  }
});

/**
 * 각 router next() 함수가 실행되면
 * 요청을 또 한번 처리할 router
 * url "/**" ANT pattern
 * "/*" 로 처리하면 "/aa", "/bb", "/cc" 만 처리
 * "/**" 로 처리하면 "/aa", "/aa/bb", "/aa/bb/cc" 등 전부 처리
 */
router.all("/**", async (req, res) => {
  try {
    const todoList = await Todo.findAll();
    return res.json(todoList);
  } catch (err) {
    return res.json({ err: "전송오류" });
  }
});

/**
 * GET /todo/aaa 요청이 들어왔을떼
 * 위의 router 들이 처리할수 있는 URL 에 필터링이 되지 않으면
 * 다음의 router 가 요청을 수신, 처리한다.
 */
router.get("/:id", (req, res) => {
  // return res.send("단일 데이터");
  return res.send("404 NOT Found");
});

export default router;
