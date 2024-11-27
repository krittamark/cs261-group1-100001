const express = require("express");
const bodyParserErrorHandler = require("express-body-parser-error-handler");
const { urlencoded, json } = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;

const requestsRouter = require("./routes/requests");

app.use(
  fileUpload({
    // Configure file uploads with maximum file size 50MB
    limits: { fileSize: 50 * 1024 * 1024 },

    // Temporarily store uploaded files to disk, rather than buffering in memory
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/requests", requestsRouter);

app.disable("x-powered-by");
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(bodyParserErrorHandler());

app.use(express.static(path.join(__dirname, "public")));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
