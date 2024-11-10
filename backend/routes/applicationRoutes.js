const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const authenticateJWT = require("../middleware/authMiddleware");

router.post("/", applicationController.createApplication);
router.get("/", applicationController.getAllApplications);
router.get("/:id", applicationController.getApplicationById);
router.put("/:id", applicationController.updateApplication);
router.delete("/:id", applicationController.deleteApplication);

module.exports = router;
