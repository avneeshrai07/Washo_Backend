const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const signupRoute = require('./routes/signupRoute');
const signinRoute = require('./routes/signinRoute');
const protectedRoute = require('./routes/protectedRoute');
const paymentRoute = require('./routes/paymentRoute');
const orderRoute = require('./routes/orderRoute');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(signupRoute);
app.use(signinRoute);
app.use(protectedRoute);
app.use('/api/payment', paymentRoute)
app.use('/api/orders', orderRoute); 



// Serve static files from the client/public directory
app.use(express.static('../client/public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
