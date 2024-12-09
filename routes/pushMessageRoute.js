const express = require('express');
const router = express.Router();
const pushMessageController = require('../controllers/pushMessageController');
console.log("message Route Accesed")
router.post('/message', pushMessageController);

module.exports = router;
