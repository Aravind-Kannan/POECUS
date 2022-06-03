const express = require("express");
const router = express.Router();
const StudentUser = require("../models/studentUser");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const studentUser = new StudentUser({
    name: req.body.name,
    email: req.body.email,
    batch: req.body.batch,
    password: req.body.password,
    registrationNumber: req.body.registrationNumber,
  });
  try {
    const newStudentUser = await studentUser.save();
    res.status(201).json({ status: "ok", user: newStudentUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const studentUser = await StudentUser.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (studentUser) {
    const token = jwt.sign(
      {
        registrationNumber: studentUser.registrationNumber,
        name: studentUser.name,
        email: studentUser.email,
        id: studentUser.id,
      },
      "secret123"
    );
    res.json({ user: token });
  } else {
    res.json({ user: false });
  }
});

router.get("/", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await user.findOne({ email: email });

    return res.json({ status: "ok", user: user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", error: "invalid token" });
  }
});

module.exports = router;
