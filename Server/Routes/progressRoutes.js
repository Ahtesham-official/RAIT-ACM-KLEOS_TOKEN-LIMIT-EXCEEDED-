const express = require("express");
const router = express.Router();

const upload = require("../Middlewares/upload.middleware.js");

const {
  submitTopicAnswer,
  submitAudioAnswer
} = require("../Controllers/ai.controller.js");

const {
  createProgress,
  getProgressBySession,
} = require("../Controllers/progressController");

/* ---------------- ROUTES ---------------- */

router.post("/", createProgress);

router.get("/:sessionId", getProgressBySession);

router.patch(
  "/:sessionId/topics/:topicName/answer",
  submitTopicAnswer
);

router.post(
  "/:sessionId/topics/:topicName/audio-answer",
  upload.single("audio"),
  submitAudioAnswer
);

module.exports = router;