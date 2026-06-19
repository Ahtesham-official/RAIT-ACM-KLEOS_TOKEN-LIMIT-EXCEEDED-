const express = require("express");
const router = express.Router();

const { createSession } = require("../Controllers/sessionController");
const { getSessions } = require("../Controllers/sessionController")

router.post("/", createSession);
router.get("/", getSessions);

module.exports = router;