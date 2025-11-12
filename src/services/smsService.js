// services/smsService.js
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

if (!accountSid || !authToken || !messagingServiceSid) {
  console.warn("Twilio credentials or Messaging Service SID are missing!");
}

const client = twilio(accountSid, authToken);

async function sendSms(to, message) {
  if (!to) return;
  try {
    const sms = await client.messages.create({
      body: message,
      messagingServiceSid: messagingServiceSid, // use Messaging Service
      to: to,
    });
    console.log("SMS sent:", sms.sid);
    return sms;
  } catch (error) {
    console.error("Failed to send SMS:", error);
    throw error;
  }
}

module.exports = { sendSms };
