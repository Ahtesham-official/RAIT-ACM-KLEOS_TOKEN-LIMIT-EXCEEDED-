const express = require("express");

const router = express.Router();

const {getDashboard, getUserDashboard} = require("../Controllers/dashboardController");

router.get("/:sessionId", getDashboard);
router.get("/user/:userId", getUserDashboard);

module.exports = router;