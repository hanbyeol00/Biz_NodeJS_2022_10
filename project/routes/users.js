import express from "express";
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("layout");
});
router.get("/login", (req, res) => {
  res.render("login");
});

export default router;
