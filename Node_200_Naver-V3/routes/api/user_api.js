import express from "express";
const router = express.Router();

// 회원가입하기
router.post("join", (req, res) => {});

// 로그인하기
router.post("login", (req, res) => {});

// 로그인한 사용자 정보 get 하기
router.get("/info", (req, res) => {});

export default router;
