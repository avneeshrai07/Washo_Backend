const express = require('express');
const TokenVerification = require('../middlewares/JWT/TokenVerification');

const router = express.Router();

// Apply `authenticateToken` to all routes under `/api`
router.use(TokenVerification);

module.exports = router;
