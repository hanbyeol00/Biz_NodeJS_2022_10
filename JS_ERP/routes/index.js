import express from "express";
import DB from "../models/index.js";
const router = express.Router();
const Buyer = DB.models.tbl_buyer;

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("layout");
});
router.get("/list", async (req, res, next) => {
  const buyers = await Buyer.findAll();
  res.render("index", { buyers });
});

router.get("/insert", (req, res) => {
  res.render("insert");
});

router.post("/insert", async (req, res) => {
  try {
    await Buyer.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect("/list");
});
router.get("/detail", (req, res) => {
  res.render("detail");
});
export default router;
