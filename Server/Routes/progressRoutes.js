const express = require("express");

const router = express.Router();

const {
  createProgress,
  getProgressBySession,
} = require("../Controllers/progressController");

router.post("/", createProgress);

router.get("/:sessionId", getProgressBySession);

module.exports = router;