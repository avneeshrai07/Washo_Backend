const jwt = require('jsonwebtoken');

const TokenGenerate = (payload) => {
    const jwtSecret = process.env.JWT_SECRET_KEY;
    const options = { expiresIn: '4h' };

    try {
        const token = jwt.sign(payload, jwtSecret, options); 
        console.log('Generated Token:', token);
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw error;
    }
};

module.exports = TokenGenerate;
