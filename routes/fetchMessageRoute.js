const express = require('express');
const router = express.Router();
const messageSchema = require("../database/messageModel");
const fetchMessageController = require('../controllers/fetchMessageController');

router.get("/:roomId", fetchMessageController);



module.exports = router;
