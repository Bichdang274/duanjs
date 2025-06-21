const express = require('express');
const router = express.Router();
const mainController = require('../controller/mainController');

router.get('/', mainController.home);
router.get('/mainvoca', mainController.mainvoca);
router.get('/grammar', mainController.grammar);
router.get('/index2', mainController.index2);

module.exports = router;
