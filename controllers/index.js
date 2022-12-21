const twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;
const APP_URL = process.env.APP_DOMAIN;

const sampleMessage = async (req, res) => {
    const response = new VoiceResponse();
    response.say({
        voice: 'alice'
    },'Hello from Rahat voip demo.');
    response.play(`${APP_URL}/audio/hello.mp3`);
    
    const newRes = response.toString();
    res.type('text/xml');
    res.send(newRes);
}

module.exports = { sampleMessage }