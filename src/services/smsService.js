// services/smsService.js
const twilio = require("twilio");
const { normalizeMozambiquePhone } = require("../utils/mozambiquePhone");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

if (!accountSid || !authToken || !messagingServiceSid) {
  console.warn("Twilio credentials or Messaging Service SID are missing!");
}

const client = twilio(accountSid, authToken);

async function sendSms(to, message) {
  if (!to) return;
  const phone = normalizeMozambiquePhone(to);

  if (!phone.isValid) {
    console.warn(`SMS skipped for ${to}: ${phone.reason}`);
    return null;
  }

  try {
    const sms = await client.messages.create({
      body: message,
      messagingServiceSid: messagingServiceSid, // use Messaging Service
      to: phone.e164,
    });
    console.log("SMS sent:", sms.sid);
    return sms;
  } catch (error) {
    console.error("Failed to send SMS:", error);
    throw error;
  }
}

module.exports = { sendSms };
