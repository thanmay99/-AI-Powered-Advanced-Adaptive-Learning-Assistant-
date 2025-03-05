const express = require('express');
const { signup, signin, submitStudentData, getPerformanceData } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);  // Register
router.post('/signin', signin);  // Login
router.post('/submitStudentData', submitStudentData); 
router.get('/performanceData', getPerformanceData); // ✅ Added Performance Data Fetching

module.exports = router;