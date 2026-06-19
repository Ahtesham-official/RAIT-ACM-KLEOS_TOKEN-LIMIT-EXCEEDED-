const express = require("express");
const router = express.Router();

const { generateSessionContent, submitTopicAnswer } = require("../Controllers/ai.controller.js");

router.post("/generate", generateSessionContent);
router.patch("/:sessionId/topics/:topicName/answer", submitTopicAnswer);

module.exports = router;