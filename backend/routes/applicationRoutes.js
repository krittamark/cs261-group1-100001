const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const authenticateJWT = require("../middleware/authMiddleware");

router.post("/", authenticateJWT, applicationController.createApplication);
router.get("/", authenticateJWT, applicationController.getAllApplications);
router.get("/:id", authenticateJWT, applicationController.getApplicationById);
router.put("/:id", authenticateJWT, applicationController.updateApplication);
router.delete("/:id", authenticateJWT, applicationController.deleteApplication);

module.exports = router;
