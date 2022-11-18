import express from "express";
import DB from "../models/index.js";

const Users = DB.models.tbl_users;
const router = express.Router();

router.get("/join", (req, res) => {
  res.render("users/join");
});

router.get("/join/register", (req, res) => {
  res.render("users/register");
});
export default router;
