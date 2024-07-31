const User = require('../models/User');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage: storage });

const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, address, birthdate } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      address,
      birthdate
    });

    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const validateToken = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

const updateProfile = [
  upload.single('medicalHistory'),
  async (req, res) => {
    const { firstName, lastName, address, birthdate } = req.body;
    const medicalHistory = req.file ? req.file.path : undefined;

    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.address = address || user.address;
      user.birthdate = birthdate || user.birthdate;
      if (medicalHistory) {
        user.medicalHistory = medicalHistory;
      }

      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user });
    } catch (error) {
      res.status(400).json({ message: 'Error updating profile', error: error.message });
    }
  }
];

module.exports = { register, loginUser, validateToken, updateProfile };
