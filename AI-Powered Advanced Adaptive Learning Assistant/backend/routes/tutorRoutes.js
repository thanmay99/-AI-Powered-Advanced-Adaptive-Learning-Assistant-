const express = require("express");
const { handleTutorQuery } = require("../controllers/tutorController"); // ✅ Import AI logic
const router = express.Router();

router.post("/", handleTutorQuery);

module.exports = router; 