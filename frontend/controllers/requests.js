const fs = require("fs");
const {
  validateAttachmentData,
  createAttachment,
  getAttachments,
  deleteAttachment,
  getFileNameByIndex,
} = require("../utils/attachment");

exports.uploadFile = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "No files were uploaded" });
  }

  const requestId = req.params.id;
  const attachmentData = req.files.files;

  if (attachmentData.length < 1 || attachmentData.length > 5) {
    return res.status(400).json({
      error: "You can only upload between 1 and 5 files",
    });
  }
  attachmentData.forEach(async (attachment, index) => {
    const validation = validateAttachmentData(attachment);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    await createAttachment(requestId, attachment, index);
  });

  res.status(201).json({ message: "Attachment uploaded successfully" });
};

exports.getFiles = async (req, res) => {
  const requestId = req.params.id;

  const files = await getAttachments(requestId);

  if (!files) {
    return res.status(500).json({ error: "Failed to retrieve attachments" });
  }

  if (files.length === 0) {
    return res.status(404).json({ error: "No attachments found" });
  }

  res.status(200).json(files);
};

exports.deleteFile = async (req, res) => {
  const requestId = req.params.id;
  const attachmentId = req.params.attachmentId;

  const deletion = await deleteAttachment(requestId, attachmentId);

  if (!deletion.valid) {
    return res.status(404).json({ error: deletion.error });
  }

  res.status(200).json({ message: "Attachment deleted successfully" });
};

exports.downloadFile = async (req, res) => {
  const requestId = req.params.id;
  const attachmentId = req.params.attachmentId;

  const attachmentPath = `./attachments/${requestId}/`;
  const fileName = await getFileNameByIndex(requestId, attachmentId);

  if (!fileName) {
    return res.status(404).json({ error: "Attachment not found" });
  }

  res.download(`${attachmentPath}${fileName}`);
};
