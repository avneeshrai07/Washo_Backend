const { SignUpModel } = require('../database/mongodb'); // Import SignUpModel

const signinController = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    console.log('Received Signin Request:', { phoneNumber, password });

    const user = await SignUpModel.findOne({ phoneNumber }); // Use SignUpModel
    console.log('Found User:', user);

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid phone number or password' });
    }

    const isPasswordValid = await user.comparePassword(password);
    console.log('Password Valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid phone number or password' });
    }

    const token = user.generateAuthToken();
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = signinController;
