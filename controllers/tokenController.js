const express = require('express');
const router = express.Router();
const TokenGenerate = require('../middlewares/JWT/TokenGenerate');
const tokenController = async(req, res) => {
  try {
    const payload = req.body; 
    if (!payload) {
        return res.status(400).json({ error: 'Payload is required to generate a token.' });
    }
    console.log('Payload for the Token', payload);
    const token = TokenGenerate(payload); // Generate the token using the function
   return res.status(200).json({ token }); // Send the token in the response
} catch (error) {
    console.error('Error generating token:', error);
    return res.status(500).json({ error: 'Failed to generate token.' });
}
  };
  
  module.exports = tokenController;
  