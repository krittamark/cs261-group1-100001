const fs = require("fs");

exports.validateStatus = (status, reason) => {
  // Uppercase the status
  status = status.toUpperCase();

  const validStatuses = ["APPROVED", "REJECTED", "PENDING"];

  if (!status) return { valid: false, error: "Status is required" };

  if (!validStatuses.includes(status))
    return { valid: false, error: "Invalid status value" };

  if (status === "REJECTED" && !reason)
    return { valid: false, error: "Reason is required for rejected requests" };

  return { valid: true };
};

exports.validateAttachmentData = validateAttachmentData = (attachmentData) => {
  const acceptedMimeTypes = ["application/pdf", "image/jpeg", "image/png"];

  if (!attachmentData) {
    return { valid: false, error: "Attachment data is required" };
  }

  if (attachmentData.size > 5000000) {
    return {
      valid: false,
      error: `Attachment file is too large (${attachmentData.name})`,
    };
  }

  if (!acceptedMimeTypes.includes(attachmentData.mimetype)) {
    return {
      valid: false,
      error: `Attachment file must be a PDF, JPEG, or PNG file (${attachmentData.name})`,
    };
  }

  return { valid: true };
};

exports.createAttachment = async (requestId, attachmentData, fileIndex) => {
  // Create file in specifics folder
  const extension = attachmentData.mimetype.split("/")[1];

  const attachmentPath = `./attachments/${requestId}/`;
  const attachmentName = `${fileIndex}-${attachmentData.name}`;
  const attachmentFullPath = `${attachmentPath}${attachmentName}`;

  // Create directory if it doesn't exist
  if (!fs.existsSync(attachmentPath)) {
    fs.mkdirSync(attachmentPath, { recursive: true });
  }

  await attachmentData.mv(attachmentFullPath, (err) => {
    if (err) {
      console.error(err);
      return { valid: false, error: "Failed to upload attachment" };
    }
  });

  return { valid: true };
};

exports.fileCount = async (requestId) => {
  // Count files from the directory
  const attachmentPath = `./attachments/${requestId}/`;

  if (!fs.existsSync(attachmentPath)) {
    return 0;
  }

  const files = fs.readdirSync(attachmentPath);
  return files.length;
};

exports.getAttachments = async (requestId) => {
  const attachmentPath = `./attachments/${requestId}/`;

  if (!fs.existsSync(attachmentPath)) {
    return [];
  }

  const files = fs.readdirSync(attachmentPath);

  files.forEach((file, index) => {
    files[index] = file.replace(`${index}-`, "");
  });

  return files;
};

exports.deleteAttachment = async (requestId, attachmentIndex) => {
  const attachmentPath = `./attachments/${requestId}/`;
  const attachmentName = `${attachmentIndex}-`;

  const files = fs.readdirSync(attachmentPath);

  const file = files.find((file) => file.startsWith(attachmentName));

  if (!file) {
    return { valid: false, error: "Attachment not found" };
  }

  fs.unlinkSync(`${attachmentPath}${file}`);

  // if folder is empty, delete it
  if (await isDirEmpty(attachmentPath)) {
    fs.rmdirSync(attachmentPath);
    return { valid: true };
  }

  // Rename indexes
  fs.readdirSync(attachmentPath).forEach((file, index) => {
    fs.renameSync(
      `${attachmentPath}${file}`,
      `${attachmentPath}${index}-${file.replace(`${index + 1}-`, "")}`
    );
  });

  return { valid: true };
};

function isDirEmpty(dirname) {
  return fs.promises.readdir(dirname).then((files) => {
    return files.length === 0;
  });
}

exports.getFileNameByIndex = async (requestId, attachmentIndex) => {
  const attachmentPath = `./attachments/${requestId}/`;

  const files = fs.readdirSync(attachmentPath);

  const file = files.find((file) => file.startsWith(`${attachmentIndex}-`));

  return file;
};
