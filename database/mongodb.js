// mongodb.js

const connectToDatabase = require('./dbConnection');
const SignUpModel = require('./userModel');
const paymentModel = require('./paymentModel');
const messageModel = require('./messageModel');
connectToDatabase();

module.exports = { SignUpModel,paymentModel,messageModel };
