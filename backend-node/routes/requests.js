const express = require("express");
const {
  uploadFile,
  getFiles,
  deleteFile,
  downloadFile,
} = require("../controllers/requests");

const router = express.Router();

router.post("/:id/attachments", uploadFile);
router.get("/:id/attachments", getFiles);
router.get("/:id/attachments/:attachmentId", downloadFile);
router.delete("/:id/attachments/:attachmentId", deleteFile);

module.exports = router;
