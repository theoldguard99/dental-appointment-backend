const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const updateUserProfile = async (req, res) => {
  const { firstName, lastName, address, birthdate } = req.body;
  const file = req.file;

  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.address = address || user.address;
      user.birthdate = birthdate || user.birthdate;
      if (file) {
        user.medicalHistory = file.path;
      }

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating profile', error: error.message });
  }
};

module.exports = { updateUserProfile, upload };
