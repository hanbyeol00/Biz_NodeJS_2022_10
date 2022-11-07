import express from "express";
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = `SELECT * FROM tbl_today;`;
  mysql.execute(sql, (err, foods, field) => {
    res.render("index", { body: "table", foods });
  });
});
router.post("/", (req, res) => {
  const foods = req.body;
  // const { fd_today, fd_name, fd_eat, fd_kcal } = req.body;
  console.log(foods);
  const sql = `INSERT INTO tbl_today(
    fd_today,fd_name,fd_eat,fd_kcal)
    VALUES(
        ?,?,?,?)`;
  mysql.execute(sql, Object.values(foods), (err, result, field) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

export default router;
