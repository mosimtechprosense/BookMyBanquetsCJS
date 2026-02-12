const express = require("express");
const router = express.Router();

router.get("/banquet-hall-in-delhi", (req, res) => {
  res.redirect(301, "/banquet-hall-in/delhi");
});

router.get("/banquet-hall-in-gurgaon", (req, res) => {
  res.redirect(301, "/banquet-hall-in/gurgaon");
});

module.exports = router;
