const express = require('express');
const { register, validateToken, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { updateUserProfile } = require('../controllers/userController'); 
const router = express.Router();

router.post('/register', register);
router.get('/validate-token', validateToken);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
