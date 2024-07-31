const express = require('express');
const { register, loginUser, validateToken } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', loginUser);
router.get('/validate-token', validateToken);

module.exports = router;
