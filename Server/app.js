const express = require('express');
const app = express();
const sessionRoutes = require("./Routes/sessionRoutes");
const progressRoutes = require("./Routes/progressRoutes");
const dashboardRoutes = require("./Routes/dashboardRoutes");
const topicRoutes = require("./Routes/topicRoutes");
const apiRoutes = require("./Routes/api.route.js");

const cors = require('cors');

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello Praxis");
});

app.use("/api/session", sessionRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/ai", apiRoutes);

module.exports = app;