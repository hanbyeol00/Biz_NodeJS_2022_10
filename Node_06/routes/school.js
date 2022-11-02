import express from "express";
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT * FROM tbl_student";
  mysql.query(sql, (err, data, field) => {
    res.render("school", { schoolData: data });
  });
});
router.post("/",(req,res)=>{
  res.setHeader("Content-Type", "text/html;charset=UTF-8");
  const body = req.body
  const num = body.st_num
  const name = body.st_name
  const dept = body.st_dept
  const grade = body.st_grade
  const tal = body.st_tal
  const addr = body.st_addr
  console.log(num)
  if(!num) {
    res.write("<script>alert('학번을 입력해주세요')</script>")
    res.write("<script>window.location=\"../list\"</script>");
  } else if(!name) {
    res.write("<script>alert('이름을 입력해주세요')</script>")
    res.write("<script>window.location=\"../list\"</script>");
  } else if(!dept) {
    res.write("<script>alert('학과를 입력해주세요')</script>")
    res.write("<script>window.location=\"../list\"</script>");
  } else if(!grade) {
    res.write("<script>alert('학년을 입력해주세요')</script>")
    res.write("<script>window.location=\"../list\"</script>");
  } else if(grade <= 0 || grade >= 5) {
    res.write("<script>alert('학년은 1 ~ 4 까지만 입력이 가능합니다')</script>")
    res.write("<script>window.location=\"../list\"</script>");
  } else if(!tal) {
    res.write("<script>alert('전화번호를 입력해주세요')</script>")
    res.write("<script>window.location=\"../list\"</script>");
  } else if(!addr) {
    res.write("<script>alert('주소를 입력해주세요')</script>")
    res.write("<script>window.location=\"../list\"</script>");
  } 
})

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
