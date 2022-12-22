const twilio = require("twilio");
const VoiceResponse = twilio.twiml.VoiceResponse;
const APP_URL = process.env.APP_DOMAIN;

const audio = async (req,res) => {
    const AUDIO_URL = `${APP_URL}/audio/sample-sound.mp3`;
    const response = new VoiceResponse();
    response.say({
        voice: 'alice'
    }, 'Hello from Rahat voip demo.');
    response.play({
        loop: 5
    },AUDIO_URL);
    res.type('text/xml').send(response.toString());
}



const ivr = async (req, res) => {
    const AUDIO_URL = `${APP_URL}/audio/hello.mp3`;
    const response = new VoiceResponse();
    response.say({
        voice: 'alice'
    }, 'Hello from Rahat voip demo.');
    // response.gather()
    response.play(AUDIO_URL);

    function gather() {
        const gatherNode = response.gather({ numDigits: 1, action: `${APP_URL}/api/v1/ivr`, method: 'POST' });
        gatherNode.say('For sales, press 1. For support, press 2.');
        // If the user doesn't enter input, loop
        response.redirect({
            uri: `${APP_URL}/api/v1/ivr`,
            method: 'POST'
        });
    }

    // If the user entered digits, process their request
    if (req.body?.Digits) {
        switch (req.body?.Digits) {
            case '1':
                response.say('You selected sales. Will redirect to sales!');
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


    const xmlRes = response.toString();
    res.type('text/xml');
    res.send(xmlRes);
}


module.exports = { ivr,audio }