const express = require("express");
const router = express.Router();
const Elective = require("../models/elective");

// Getting All
router.get("/", async (req, res) => {
  try {
    const electives = await Elective.find();
    res.json(electives);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
