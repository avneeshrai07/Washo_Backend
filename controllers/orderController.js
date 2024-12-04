const Payment = require('../database/paymentModel');

exports.getOrders = async (req, res) => {
    try {
        console.log('Fetching orders...');
        const orders = await Payment.find().sort({ date: -1 });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};
