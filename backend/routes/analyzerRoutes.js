const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  analyzeResume,
} = require("../controllers/analyzerController");
router.post(
  "/resume",
  upload.single("resume"),
  analyzeResume
);

module.exports = router;