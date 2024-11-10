const express = require("express");
const bodyParser = require("body-parser");
const applicationRoutes = require("./routes/applicationRoutes");
require("./config/db");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());

// Use routes
app.use("/api/applications", applicationRoutes);

// Error handling middleware (example)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;