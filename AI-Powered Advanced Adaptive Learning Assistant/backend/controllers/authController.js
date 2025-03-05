const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const StudentData = require('../models/StudentData'); // ✅ Import Student Data Model
const JWT_SECRET = 'your_jwt_secret';

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const submitStudentData = async (req, res) => {
  try {
    console.log("Received Student Data:", req.body);  // Debugging log
    const { email, score, attendance, emotionalStatus } = req.body;

    if (!email || score === undefined || attendance === undefined || !emotionalStatus) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const studentData = new StudentData({ email, score, attendance, emotionalStatus });
    await studentData.save();

    res.status(201).json({ message: 'Student data submitted successfully' });
  } catch (error) {
    console.error('Error submitting student data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ✅ Fetch Performance Data
const getPerformanceData = async (req, res) => {
  try {
    const data = await StudentData.find({});
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching performance data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ✅ Export all functions
module.exports = { signup, signin, submitStudentData, getPerformanceData };
