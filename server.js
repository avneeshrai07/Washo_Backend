const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow your frontend's origin
  credentials: true,  // Allow sending credentials (cookies, etc.)
};

// Middleware setup
app.use(cors(corsOptions));  // Correct placement of CORS middleware
app.use(bodyParser.json());  // Parse JSON bodies
app.use(cookieParser());     // Parse cookies

// Routes and middleware
const signupRoute = require('./routes/signupRoute');
const signinRoute = require('./routes/signinRoute');
const protectedRoute = require('./routes/protectedRoute');
const paymentRoute = require('./routes/paymentRoute');
const orderRoute = require('./routes/orderRoute');
const TokenGenerateRoute = require('./routes/tokenGenerateRoute');

// Protect /api routes with protected routes
app.use('/api', protectedRoute);

// Protected routes
app.use('/api/payment', paymentRoute);
app.use('/api/orders', orderRoute);

// Normal Routes
app.use(TokenGenerateRoute); // Token generation route
app.use(signupRoute);        // Signup route
app.use(signinRoute);        // Signin route

// Serve static files from the client/public directory
app.use(express.static(path.join(__dirname, '../client/public')));

// Handle all other routes and serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
