const express = require("express");

const router = express.Router();

const {
  getTopicsBySession,
} = require("../Controllers/topicController");

router.get("/:sessionId", getTopicsBySession);

module.exports = router;