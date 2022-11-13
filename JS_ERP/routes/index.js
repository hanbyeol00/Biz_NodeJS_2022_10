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
router.get("/write", (req, res) => {
  res.render("write");
});
router.get("/write/:b_id", async (req, res) => {
  const buyer = await Buyer.findAll({ where: { b_id: req.params.b_id } });
  res.render("write", { buyer: buyer[0] });
});

router.post("/write/:b_id", async (req, res) => {
  const buyer = await Buyer.update(req.body, {
    where: { b_id: req.params.b_id },
  });
  res.redirect(`/detail/${req.params.b_id}`);
});

router.post("/write", async (req, res) => {
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
router.get("/detail/:b_id", async (req, res) => {
  const buyer = await Buyer.findAll({ where: { b_id: req.params.b_id } });
  res.render("detail", { buyer: buyer[0] });
});
router.post("/detail/:b_id", async (req, res) => {
  Buyer.destroy({ where: { b_id: req.params.b_id } });
  res.redirect("/list");
});

export default router;
