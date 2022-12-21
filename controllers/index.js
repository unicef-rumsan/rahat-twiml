const twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;
const APP_URL = process.env.APP_DOMAIN;

const sampleMessage = async (req, res) => {
    const response = new VoiceResponse();
    response.say('Hello from rahat');
    response.play(`${APP_URL}/audio/hello.mp3`);
    res.status(200).send(response.toString())
}

module.exports = { sampleMessage }