import twilio from 'twilio';

// Twilio credentials
const accountSid = 'AC8c70ab34832c7152373e8d01829bce95'; // Your Account SID
const authToken = '1c6b0aaa06310fa810fac2bea074b1e7'; // Your Auth Token
const client = new twilio(accountSid, authToken);

// Function to send SMS
const sendSms = (to, body) => {
  client.messages
    .create({
      body: body,
      from: '+17634529657',
      to: '+919787825610',
    })
    .then((message) => console.log('Message sent:', message.sid))
    .catch((error) => console.error('Error sending message:', error));
};


sendSms('+916383667872', 'You are arrested');
