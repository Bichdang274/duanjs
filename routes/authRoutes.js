const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');



router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/sign_up', authController.getSignUp);
router.post('/add', authController.postSignUp);

module.exports = router;
