const express = require("express");

const router = express.Router();
module.exports = router;

const validateAttachmentData = (attachmentData) => {
  if (!attachmentData) {
    return { valid: false, error: "Attachment data is required" };
  }
  if (attachmentData.length > 1) {
    return { valid: false, error: "Only one attachment is allowed" };
  }
  if (attachmentData.size > 1000000) {
    return { valid: false, error: "Attachment file is too large" };
  }
  if (
    attachmentData.mimetype !== "application/pdf" &&
    attachmentData.mimetype !== "image/jpeg" &&
    attachmentData.mimetype !== "image/png"
  ) {
    return { valid: false, error: "Attachment file must be a PDF, JPEG, or PNG" };
  }
  return { valid: true };
};

router.post("/:id/attachments", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "No files were uploaded" });
  }

  const requestId = req.params.id;
  const attachmentData = req.files.files;

  console.log("Request ID:", requestId);
  console.log("Attachment data:", attachmentData);

  const validation = validateAttachmentData(attachmentData);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  res.status(201).json({ message: "Attachment uploaded successfully" });
});

const validateStatus = (status, reason) => {
  if (!status) {
    return { valid: false, error: "Status is required" };
  }
  if (status !== "APPROVED" && status !== "REJECTED" && status !== "PENDING") {
    return { valid: false, error: "Invalid status value" };
  }
  if (status === "REJECTED" && !reason) {
    return { valid: false, error: "Reason is required for rejected requests" };
  }
  return { valid: true };
};

router.put("/:id/status", (req, res) => {
  const requestId = req.params.id;
  const status = req.body.status;
  const reason = req.body.reason;

  console.log("Request ID:", requestId);
  console.log("Status:", status);

  const validation = validateStatus(status, reason);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }
  
  
  
  res.status(200).json({ message: "Request status updated successfully" });
});
