import express from "express";
import DB from "../models/index.js";

const Users = DB.models.tbl_users;
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("test/login");
});

export default router;
