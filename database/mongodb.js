// mongodb.js

const connectToDatabase = require('./dbConnection');
const SignUpModel = require('./userModel');
const paymentModel = require('./paymentModel');
connectToDatabase();

module.exports = { SignUpModel,paymentModel };
