import express from "express";
import path from "path";
import logger from "morgan";

import schoolTRouter from "../routes/schoolTable.js";
import schoolRouter from "../routes/school.js";

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join("./public")));

app.set("views", path.join("./views"));
app.set("view engine", "ejs");

app.use("/", schoolTRouter);
app.use("/list", schoolRouter);
export default app;
