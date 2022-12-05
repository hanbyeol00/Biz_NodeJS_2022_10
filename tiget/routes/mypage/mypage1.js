import express from "express";
import DB from "../../models/index.js";
const Users = DB.models.user;

const router = express.Router();
router.get("/", (req, res) => {
  res.render("mypage");
});
router.get("/pwChange/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const result = await Users.findByPk(username);
    res.render("mypage", { user: result });
  } catch (err) {
    res.json(err);
    console.error(err);
  }
});
router.post("/pwChange/:username", async (req, res) => {
  const username = req.params.username;
  const { nowPw, newPw } = req.body;
  try {
    const pwChk = await Users.findOne({ where: { password: nowPw } });
    if (pwChk == null) {
      res.redirect("/mypage1");
      return false;
    }
  } catch (err) {
    console.error(err);
    res.json(err);
  }
  try {
    await Users.update(
      { password: newPw },
      {
        where: { username: username },
      }
    );
    res.redirect("/mypage1");
  } catch (err) {
    console.error(err);
  }
});

export default router;
