const axios = require("axios");

// Load your SmsMode API token from .env
const smsModeToken = process.env.SMSMODE_TOKEN;

if (!smsModeToken) {
  console.warn("⚠️ SmsMode API token not set in environment variables!");
}

/**
 * Send an SMS message using SmsMode API
 * @param {string} to - Recipient phone number in international format (e.g. 25884XXXXXXX)
 * @param {string} message - Message content
 */
async function sendSms(to, message) {
  if (!to) {
    console.warn("⚠️ No phone number provided to sendSms()");
    return;
  }

  try {
    const url = "https://api.smsmode.com/http/1.6/sendSMS.do";

    const params = new URLSearchParams({
      accessToken: smsModeToken,
      numero: to,
      message: message,
      emetteur: "QueueSys" // optional sender name (max 11 chars, letters only)
    });

    const response = await axios.post(url, params);

    // SmsMode returns simple text or code for success/error
    console.log("✅ SmsMode response:", response.data);
  } catch (error) {
    console.error("❌ Failed to send SMS via SmsMode:", error.response?.data || error.message);
  }
}

module.exports = { sendSms };
