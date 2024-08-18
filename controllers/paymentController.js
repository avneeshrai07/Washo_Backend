// paymentController.js

const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../database/paymentModel.js');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

exports.initiatePayment = async (req, res) => {
  const { totalCost } = req.body;

  const options = {
    amount: totalCost * 100, // amount in paise
    currency: 'INR',
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.verifyPayment = async (req, res) => {
  const { paymentId, orderId, signature } = req.body;

  const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(orderId + '|' + paymentId)
    .digest('hex');

  if (generatedSignature === signature) {
    const newPayment = new Payment({
      orderId,
      paymentId,
      date: new Date(),
      items: req.body.items,
      totalCost: req.body.totalCost,
    });

    try {
      await newPayment.save();
      res.json({ success: true });
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(400).json({ success: false });
  }
};
