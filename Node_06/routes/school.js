import express from "express";
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT * FROM tbl_student";
  mysql.query(sql, (err, data, field) => {
    res.render("school", { schoolData: data });
  });
});
router.post("/", (req, res) => {
  res.setHeader("Content-Type", "text/html;charset=UTF-8");
  const body = req.body;
  const data =
    (([num] = [body.st_num]),
    ([name] = [body.st_name]),
    ([dept] = [body.st_dept]),
    ([grade] = [body.st_grade]),
    ([tel] = [body.st_tel]),
    ([addr] = [body.st_addr]));
});

// router.post("/",(req,res)=>{
//   res.setHeader("Content-Type", "text/html;charset=UTF-8");
//   const body = req.body
//   const data = {
//   num : body.st_num,
//   name : body.st_name,
//   dept : body.st_dept,
//   grade : body.st_grade,
//   tal : body.st_tal,
//   addr : body.st_addr,
//   }
//   console.log(data)
//   data.forEach(data => {
//     if(!data){
//       res.write("<script>alert('학번을 입력해주세요')</script>")
//       res.write("<script>window.location=\"/.\"</script>");
//     }
//   });
// })
export default router;
