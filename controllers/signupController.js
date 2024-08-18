const { SignUpModel } = require('../database/mongodb'); // Make sure the path is correct
const { sendSMS } = require('./twilioService');

const signupController = async (req, res) => {
  try {
    const newUserSignUpData = req.body;
    console.log('Received Signup Request:', newUserSignUpData);

    const existingUser = await SignUpModel.findOne({ phoneNumber: newUserSignUpData.number });
    if (existingUser) {
      console.log('User with this phone number already exists.');
      return res.status(400).json({ message: 'User with this phone number already exists.' });
    }

    const user = new SignUpModel({ 
      username: newUserSignUpData.username, 
      phoneNumber: newUserSignUpData.number, 
      password: newUserSignUpData.password 
    });
    await user.save();

    console.log('User signed up successfully.');
    res.json({ message: 'User signed up successfully.' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = signupController;
