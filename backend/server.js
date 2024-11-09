const express = require("express");
const bodyParser = require("body-parser");
const applicationRoutes = require("./routes/applicationRoutes");
require("./config/db");

const app = express();

app.use(bodyParser.json());

// Use routes
app.use("/api/applications", applicationRoutes);

// Error handling middleware (example)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app; // Export the app for use in server.js
