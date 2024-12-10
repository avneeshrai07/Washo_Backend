const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Initialize Socket.IO with CORS configuration
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket"],
});

// Attach the Socket.IO instance to the Express app
app.set("socketio", io);

// Middleware setup
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

// Import and use routes
const signupRoute = require('./routes/signupRoute');
const signinRoute = require('./routes/signinRoute');
const protectedRoute = require('./routes/protectedRoute');
const paymentRoute = require('./routes/paymentRoute');
const orderRoute = require('./routes/orderRoute');
const pushMessageRoute = require('./routes/pushMessageRoute');
const TokenGenerateRoute = require('./routes/tokenGenerateRoute');
const fetchMessageRoute = require('./routes/fetchMessageRoute');


app.use('/api', protectedRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/orders', orderRoute);
app.use(TokenGenerateRoute);
app.use(signupRoute);
app.use(signinRoute);
app.use(pushMessageRoute);
app.use('/api/fetchMessages/',fetchMessageRoute);


// Serve static files for React
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// Import and initialize Socket.IO handlers
require('./middlewares/Socket.io/socketHandler')(io);


// Start the server
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
