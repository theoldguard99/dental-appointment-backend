const express = require('express');
const { register, validateToken, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../controllers/userController'); 
const router = express.Router();

router.post('/register', register);
router.get('/validate-token', validateToken);
router.put('/profile', protect, upload.single('medicalHistory'), updateProfile);

module.exports = router;
