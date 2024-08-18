const Payment = require('../database/paymentModel');


exports.getOrders = async (req, res) => {
    try {
        console.log('Fetching orders...');
        const orders = await Payment.find().sort({ date: -1 });
        console.log('Orders:', orders); // Check the data format
        res.json(orders); // Ensure this is correct
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};
