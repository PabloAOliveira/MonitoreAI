import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_WHATSAPP_FROM;

const client = twilio(accountSid, authToken);

export async function sendWhatsappAlert(to, message) {
  return client.messages.create({
    body: message,
    from,
    to: `whatsapp:${to}`,
  });
}
