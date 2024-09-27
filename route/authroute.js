const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');
const authenticateToken = require('../middleware/auth');

router.post('/auth/sign-up', userController.register);
router.post('/auth/sign-in', userController.login);
router.get('/auth/me', authenticateToken, userController.profile);

module.exports = router;