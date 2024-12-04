const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    orderId: String,
    paymentId: String,
    date: Date,
    items: Object,
    totalCost: Number
}, { timestamps: true });

const paymentModel = mongoose.model('Payment', paymentSchema);
module.exports = paymentModel;
