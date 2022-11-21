import express from "express";
import upload from "../modules/file_upload.js";
import DB from "../models/index.js";

const Users = DB.models.tbl_users;
const router = express.Router();

router.get("/join", (req, res) => {
  res.render("users/join");
});

router.get("/join/register", (req, res) => {
  res.render("users/register");
});
router.get("/bltBrd", (req, res) => {
  res.render("users/bltBrd");
});
router.get("/bltBrd/write", (req, res) => {
  res.render("users/write");
});
router.post("/bltBrd/write", upload.single("c_image_file"), (req, res) => {
  console.log(req.body);
  // res.json(req.file);
  const fileName = req?.file?.filename;
  // req.body.p_vat = req.body?.p_vat || 0;
  const body = req.body;
  res.send(body);

  // res.render("products/detail", { fileName });
});
export default router;
