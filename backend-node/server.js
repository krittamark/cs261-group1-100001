const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const requestsRouter = require("./routes/requests");

const PORT = 3001;

// Middleware for file uploads

app.use(
  fileUpload({
    // Configure file uploads with maximum file size 50MB
    limits: { fileSize: 50 * 1024 * 1024 },

    // Temporarily store uploaded files to disk, rather than buffering in memory
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", requestsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
