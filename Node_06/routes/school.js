import express from "express";
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT * FROM tbl_student";
  mysql.query(sql, (err, data, field) => {
    res.render("shcool", { schoolData: data });
  });
});
export default router;
