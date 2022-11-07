import express from "express";
import path from "path";
import logger from "morgan";

import indexRouter from "../routes/index.js";

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));

app.set("views", path.join("views"));
app.set("view engine", "ejs");

app.use(express.static(path.join("public")));

app.use("/", indexRouter);

export default app;
