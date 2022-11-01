import express from "express";

const router = express.Router();

router.get("/:num1/:num2", (req, res) => {
  const { num1, num2 } = req.params;
  res.send(`${num1} + ${num2} = ${Number(num1) + Number(num2)}`);
});

export default router;
