import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  // app.locals : ejs, pug 등 view Template 에서 서버의
  // global 데이터에 접근하는 통로
  if (req.session.user) {
    // 로그인이 되면 global 변수에
    // session 에 담긴 user 정보를 추가
    app.locals.user = req.session?.user;
  } else {
    // 로그아웃이 되었거나, 어떤이유로 session 에 로그인 정보가 없으면
    // globa; 데이터에서 user 데이터 제거
    delete app.locals.user;
  }
  res.render("main");
});

export default router;
