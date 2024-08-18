// orderRoute.js
const express = require('express');
const orderController = require('../controllers/orderController');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('Order route accessed');
    next();
  }, orderController.getOrders);
  
module.exports = router;
