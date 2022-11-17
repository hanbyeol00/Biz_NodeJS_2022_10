import express from "express";
import DB from "../models/index.js";
const Product = DB.models.tbl_product;
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.findAll();
  res.render("product/list", { products });
});

router.get("/insert", (req, res) => {
  res.render("product/write", { product: {} });
});

router.post("/insert", async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    await Product.create(data);
    res.redirect("/product");
  } catch (err) {
    console.error(err);
    res.send("SQL 오류");
  }
});

router.get("/detail/:pcode", async (req, res) => {
  const pcode = req.params.pcode;
  try {
    const product = await Product.findOne({ where: { p_code: pcode } });
    res.render("product/detail", { product });
  } catch (err) {
    res.send("SQL오류!! 데이터를 찾을 수 없음");
  }
});

router.get("/update/:pcode", async (req, res) => {
  const pcode = req.params.pcode;
  try {
    const product = await Product.findOne({ where: { p_code: pcode } });
    res.render("product/write", { product: product });
  } catch (err) {
    res.send("SQL 오류~~ 데이터를 찾을 수 없음");
  }
});

router.post("/update/:pcode", async (req, res) => {
  try {
    await Product.update(req.body, { where: { p_code: req.body.p_code } });
    res.redirect(`/product/detail/${req.body.p_code}`);
  } catch (err) {
    res.send("SQL 오류");
  }
});

router.get("/delete/:pcode", async (req, res) => {
  const pcode = req.params.pcode;

  try {
    await Product.destroy({ where: { p_code: pcode } });
    res.redirect("/product");
  } catch (err) {
    res.send("SQL 오류");
  }
});

router.get("/check/:pcode", async (req, res) => {
  const pcode = req.params.pcode;
  try {
    const product = await Product.findByPk(pcode);
    if (product) {
      return res.json({ status: "YES", message: "등록된 거래처 코드" });
    } else {
      return res.json({ status: null, message: "사용할 수 있는 코드" });
    }
  } catch (err) {
    res.send("SQL 오류");
  }
});

export default router;
