// // twilioService.js
// require('dotenv').config();
// const twilio = require('twilio');
// const { parsePhoneNumberFromString } = require('libphonenumber-js');

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// const client = new twilio(accountSid, authToken);

// const sendSMS = async (phoneNumber, verificationCode) => {
//   const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'IN'); // 'IN' is the country code for India, adjust it accordingly
//   const formattedPhoneNumber = parsedPhoneNumber ? parsedPhoneNumber.formatInternational() : null;

//   if (!formattedPhoneNumber) {
//     console.error('Invalid phone number:', phoneNumber);
//     throw new Error('Invalid phone number');
//   }

//   // Remove spaces from the formatted phone number
//   const sanitizedPhoneNumber = formattedPhoneNumber.replace(/\s/g, '');

//   const message = `Your verification code is: ${verificationCode}`;
//   try {
//     const result = await client.messages.create({
//       body: message,
//       from: twilioPhoneNumber,
//       to: sanitizedPhoneNumber,
//     });
//     console.log('SMS sent:', result.sid);
//     return result.sid;
//   } catch (error) {
//     console.error('Error sending SMS:', error);
//     throw error;
//   }
// };

// module.exports = { sendSMS };
