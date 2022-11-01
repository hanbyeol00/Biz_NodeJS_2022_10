import express from "express";
import path from "path";
import logger from "morgan";

// routes
import calcRouter from "../routes/calc.js";
import countryRouter from "../routes/country.js";

const app = express();
app.use(logger("dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join("./public")));

// project/views 폴더를 views 이름으로 세팅
app.set("views", path.join("./views"));
app.set("view engine", "ejs");

// RequestMapping 과 router 를 연결하기
app.use("/calc", calcRouter);
app.use("/country", countryRouter);

export default app;
