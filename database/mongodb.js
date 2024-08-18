// mongodb.js

const connectToDatabase = require('./dbConnection');
const SignUpModel = require('./userModel');

connectToDatabase();

module.exports = { SignUpModel };
