const twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;
const APP_URL = process.env.APP_DOMAIN;

const sampleMessage = async (req, res) => {
    const response = new VoiceResponse();
    response.say('Hello from rahat');
    response.play(`${APP_URL}/audio/hello.mp3`);
    
    const newRes = response.toString();

    res.type('application/xml');
    res.send(newRes)
}

module.exports = { sampleMessage }