const express = require("express");
const router = express.Router();
const Form = require("../models/form");
const StudentUser = require("../models/studentUser");
const Response = require("../models/response");

router.post("/future", async (req, res) => {
  const id = req.body.id;
  const registrationNumber = req.body.registrationNumber;

  try {
    let forms = await Form.find();
    let student = await StudentUser.findById(id);
    forms = forms.filter(
      (form) => JSON.parse(form.batch)._id === student.batch
    );

    let responses = await Response.find({
      registrationNumber: registrationNumber,
    });

    forms = forms.filter((form) => {
      for (let i = 0; i < responses.length; i++) {
        if (form._id === responses[i].form) return false;
      }
      return true;
    });

    res.json({ status: "ok", forms: forms });
  } catch (err) {
    res.status(404).json({ status: "error", message: err });
  }
});

// router.post("/past", async (req, res) => {});

module.exports = router;
