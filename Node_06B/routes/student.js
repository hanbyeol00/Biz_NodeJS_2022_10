import express from "express";
import mysql from "../modules/mysqlDB.js";
const router = express.Router();

router.get("/", (req, res) => {
  let st_name = req.query.st_name;
  let sql = "SELECT * FROM tbl_student ORDER BY st_num";
  if (st_name) {
    sql = ` SELECT* FROM tbl_student
        WHERE st_name LIKE CONCAT('%' , ?, '%')
        ORDER BY st_num `;
  } else {
    st_name = "";
  }
  mysql.execute(sql, [st_name], (err, students, field) => {
    // 내부에서(Mysql select 된 데이터) 만들어진 데이터를
    // students 라는 이름의 변수에 담아
    // res.render("student", {students:student})
    res.render("student/st_main", { body: "list", students });
  });
});

router.get("/insert", (req, res) => {
  res.render("student/st_main", { body: "write", student: {} });
});

router.post("/insert", (req, res) => {
  const student = req.body;
  console.log(student);
  const sql = `INSERT INTO tbl_student(
    st_num,st_name,st_dept,st_grade,st_tel,st_addr)
    VALUES(
        ?,?,?,?,?,?
  )`;
  mysql.execute(sql, Object.values(student), (err, result, field) => {
    if (err) {
      console.log(err);
    }
    /**
     * POST /student/insert
     * 코드가 여기까지 실행되면 추가된 학생정보가
     * 잘 추가되었는지 확인하기 위하여 다시 학생정보 List 를
     * 보여줘야 한다
     *
     * 이미 학생정보 List 를 보여주는 router 를 만들어 두었다
     * 다시 여기에서 List 를 SELECT 하여 보여주는 코드를
     * 작성하는 대신
     * server 의 router 에서 web browser 에게 요청을 한다
     * 이미 List 를 보여주는 router(RequestMapping)가 있으니
     * 다시 한번 요청을 해달라
     */
    res.redirect(`/student?st_name=${student.st_name}`);
  });
});

router.get("/:st_num/detail", (req, res) => {
  const st_num = req.params.st_num;
  /**
   * DB SQL 을 코딩할때 매우 주의할 사항!!!
   * 아래와 같이 문자열을 직접 코딩하여
   * WHERE 절을 만들 경우
   * 예를 들어 S OR 1=1 과 같은 문자열을 st_num 변수에
   * 담아서 전달을 하면 WHERE 의 조건이 무력화 되는
   * 명령이 실행된다
   * 만약 DELETE, UPDATE 명령을 수행할때 이러한 코드를
   * 작성하면 해커에 의해 DB 가 바로 손상될수 있다
   *
   * 이러한 해킹 공격을 DB EnJection 공격이라고 한다
   * 매우 주의 해야 한다!!
   */
  // const sql = `SELECT * FROM tbl_student
  //             WHERE st_num = ${st_num}`;
  const sql = "SELECT * FROM tbl_student WHERE st_num = ?";
  mysql.execute(sql, [st_num], (err, student, field) => {
    // res.json(student);
    res.render("student/st_main", { body: "detail", student: student[0] });
  });
});

/**
 * /student/학번/update 로 Request 가 되면
 * DB 에서 학생점보를 SELECT 하고
 * st_write 로 보내서 input input box 에 정보를 표시하기
 */
router.get("/:st_num/update", (req, res) => {
  const st_num = req.params.st_num;
  const sql = "SELECT * FROM tbl_student WHERE st_num = ?";
  mysql.execute(sql, [st_num], (err, student, field) => {
    res.render("student/st_main", { body: "write", student: student[0] });
  });
});
router.post("/:st_num/update", (req, res) => {
  const { st_num, st_name, st_dept, st_grade, st_tel, st_addr } = req.body;
  console.log(st_name);
  const sql = `UPDATE tbl_student
  set st_name = ?,
  st_dept = ?,
  st_grade = ?,
  st_tel = ?,
  st_addr = ?
  WHERE st_num = ?`;
  mysql.execute(
    sql,
    [st_name, st_dept, st_grade, st_tel, st_addr, st_num],
    (err, result, field) => {
      if (err) {
        console.log(err);
      }
      res.redirect(`/student/${st_num}/detail`);
    }
  );
});

export default router;
