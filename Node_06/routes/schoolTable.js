import express from "express";
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT * FROM tbl_student";
  mysql.query(sql, (err, data, field) => {
    res.render("schoolTable", { schoolData: data });
  });
});
router.post("/", (req, res) => {
  const name = req.body.st_name;
  const sql = " SELECT * FROM tbl_student WHERE st_name LIKE CONCAT('%',?,'%')";
  mysql.execute(sql, [name], (err, data, field) => {
    res.render("schoolTable", { schoolData: data });
  });
});

export default router;
