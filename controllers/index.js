const twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;
const APP_URL = process.env.APP_DOMAIN;
const AUDIO_URL = `${APP_URL}/audio/hello.mp3`;

const sampleMessage = async (req, res) => {
    console.log("CALLED", req.body);

    const response = new VoiceResponse();
    response.say({
        voice: 'alice'
    }, 'Hello from Rahat voip demo.');
    // response.gather()
    // response.play(AUDIO_URL);

    function gather() {
        const gatherNode = response.gather({ numDigits: 1 });
        gatherNode.say('For sales, press 1. For support, press 2.');
        // If the user doesn't enter input, loop
        response.redirect({
            uri: `${APP_URL}/api/v1/getSampleMessage`,
            method: 'GET'
        });
    }

    // If the user entered digits, process their request
    req.body.Digits = 1;
    if (req.body?.Digits) {
        switch (req.body?.Digits) {
            case '1':
                response.say('You selected sales. Good for you!');
                break;
            case '2':
                response.say('You need support. We will help!');
                break;
            default:
                response.say("Sorry, I don't understand that choice.");
                response.pause();
                gather();
                break;
        }
    } else {
        // If no input was sent, use the <Gather> verb to collect user input
        gather();
    }


    const newRes = response.toString();
    res.type('text/xml');
    res.send(newRes);
}

module.exports = { sampleMessage }