const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// router.get('/auth/login', authController.getLogin);
// router.post('/auth/login', authController.postLogin);
// router.get('/auth/sign_up', authController.getSignIn);
// router.post('auth/add', authController.postSignUp);



// /auth/login
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// /auth/sign_up
router.get('/sign_up', authController.getSignUp);
router.post('/add', authController.postSignUp);

module.exports = router;
