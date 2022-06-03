const express = require("express");
const router = express.Router();
const Response = require("../models/response");

// Getting All
router.get("/", async (req, res) => {
  try {
    const responses = await Response.find();
    res.json(responses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getResponse, (req, res) => {
  res.json(res.response);
});

// Creating One
router.post("/", async (req, res) => {
  const response = new Response({
    registrationNumber: req.body.registrationNumber,
    form: req.body.form,
    batch: req.body.batch,
    priority1: req.body.priority1,
    priority2: req.body.priority2,
    priority3: req.body.priority3,
  });
  try {
    const newResponse = await response.save();
    res.status(201).json(newResponse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch("/:id", getResponse, async (req, res) => {
  if (req.body.registrationNumber != null) {
    res.response.registrationNumber = req.body.registrationNumber;
  }
  if (req.body.form != null) {
    res.response.form = req.body.form;
  }
  if (req.body.priority1 != null) {
    res.response.priority1 = req.body.priority1;
  }
  if (req.body.priority2 != null) {
    res.response.priority2 = req.body.priority2;
  }
  if (req.body.priority3 != null) {
    res.response.priority3 = req.body.priority3;
  }
  if (req.body.batch != null) {
    res.response.batch = req.body.batch;
  }

  try {
    const updatedResponse = await res.response.save();
    console.log(updatedResponse);
    res.json(updatedResponse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getResponse, async (req, res) => {
  try {
    await res.response.remove();
    res.json({ message: "Deleted Response" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Custom Middleware
async function getResponse(req, res, next) {
  let response;
  try {
    response = await Response.findById(req.params.id);
    if (response == null)
      return res.status(404).json({ message: "Cannot find form" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.response = response;
  next();
}

module.exports = router;
