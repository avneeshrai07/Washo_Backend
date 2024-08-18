const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const protectedController = require('../controllers/protectedController');

router.get('/protected', authenticateToken, protectedController);

module.exports = router;
