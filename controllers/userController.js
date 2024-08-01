const User = require('../models/User');

const updateUserProfile = async (req, res) => {
  const { firstName, lastName, address, birthdate, contactNumber } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.address = address || user.address;
      user.birthdate = birthdate || user.birthdate;
      user.contactNumber = contactNumber || user.contactNumber;

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating profile', error: error.message });
  }
};

module.exports = { updateUserProfile };
