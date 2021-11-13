// api/auth
const router = require('express').Router();
const authController = require('./auth.controller');

// đăng ký, 
router.post('/signup', authController.signUp);
router.post('/login', authController.login);

module.exports = router;