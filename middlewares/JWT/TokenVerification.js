const { verify } = require('jsonwebtoken');

const TokenVerification = (req, res, next) => {
  console.log('Token Varification triggered');
  
  // Access the token from the cookie directly (no need for splitting "Bearer <token>")
  const token = req.cookies.token;
  console.log('Token from cookies:', token);

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }

  try {
    const verified = verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified; // Attach verified user data to the request
    console.log('Token verified');
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = TokenVerification;
