import express from "express";
import { USER_RES } from "../../config/api_res_code.js";
import { userLogin } from "../../modules/users_module.js";

const router = express.Router();

// 로그인하기
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("username", username, "password", password);

  try {
    const loginUser = await userLogin(req.body);
    if (!loginUser) return res.json(USER_RES.LOGIN_FAIL);
    // session 에 user 정보 setting
    req.session.user = loginUser;
    return res.json(loginUser);
  } catch (err) {
    console.log(err?.message);
    return res.json(JSON.parse(err?.message));
  }
});

router.get("/session", async (req, res) => {
  const user = req.session?.user;
  if (!user) return res.json(USER_RES.USER_NOT_SESSION);
  return res.json(user);
});

// 회원가입하기
router.post("/join", (req, res) => {});

router.get("/logout", (req, res) => {
  req.session.user = undefined;
  return res.json(null);
});

// 로그인한 사용자 정보 get 하기
router.get("/info", (req, res) => {});

export default router;
