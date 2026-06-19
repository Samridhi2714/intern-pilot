const express = require("express");

const router = express.Router();

const {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication,
} = require("../controllers/applicationController");

router.post("/", createApplication);
router.get("/user/:userId", getApplications);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);
module.exports = router;