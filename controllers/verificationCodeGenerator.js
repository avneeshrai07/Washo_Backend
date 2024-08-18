const generateVerificationCode = () => {
    // You can implement your own logic to generate a verification code
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  
  module.exports = { generateVerificationCode };
  