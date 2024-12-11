const express = require('express');
const router = express.Router();
const pushMessageController = require('../controllers/pushMessageController');
router.post('/message', pushMessageController);

module.exports = router;
