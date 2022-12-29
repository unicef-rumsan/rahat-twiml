const fs = require("fs");
const twilio = require("twilio");
const { dirname } = require("path");
const { checkMp3 } = require("../utils")

const VoiceResponse = twilio.twiml.VoiceResponse;
const APP_URL = process.env.APP_DOMAIN;
const APP_ROOT_PATH = dirname(require.main.filename);

const ivr = async (req, res) => {

    console.log("Request body =>", req.body, APP_URL);

    // const AUDIO_URL = `${APP_URL}/audio/hello.mp3`;
    const response = new VoiceResponse();
    response.say({
        voice: 'alice'
    }, 'Hello from Rahat voip demo.');
    // response.gather()
    // response.play(AUDIO_URL);

    function gather() {
        const gatherNode = response.gather({
            numDigits: 1,
            action: `${APP_URL}/api/v1/ivr`,
            method: 'POST',
            finishOnKey: '',
            input: 'dtmf'
        });
        // const gatherNode = response.gather({ numDigits: 1 });
        gatherNode.say('For sales, press 1. For support, press 2.');
        // If the user doesn't enter input, loop
        response.redirect({
            method: 'POST'
        }, `${APP_URL}/api/v1/ivr`);
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


const audio = async (req, res) => {
    const audioFile=req.params.audioFile;
    const AUDIO_URL = `${APP_URL}/audio/${audioFile}`;
    const response = new VoiceResponse();
    response.play({
        loop: 2
    }, AUDIO_URL);
    res.type('text/xml').send(response.toString());
}


const uploadAudio = async (req, res) => {
    try {
        if (!req.files?.audioUpload || Object.keys(req.files).length === 0) {
            return res.status(400).json({ status: false, message: "No files were uploaded" });
        }
        //The name of the input field (i.e. "audioUpload") is used to retrieve the uploaded file
        const audioFile = req.files.audioUpload;
        if (!checkMp3(audioFile.name)) {
            return res.status(400).json({ status: false, message: "Only mp3 audio is allowed." });
        }

        const uploadedAudioFiles = fs.readdirSync(`${APP_ROOT_PATH}/assets/audio/`);
        if (uploadedAudioFiles.includes(audioFile.name)) {
            return res.status(400).json({ status: false, message: "Audio file name already exists." });
        }
        const uploadPath = `${APP_ROOT_PATH}/assets/audio/${audioFile.name}`;
        // Use the mv() method to place the file somewhere on your server
        await audioFile.mv(uploadPath);
        return res.status(200).json({ status: true, message: "Upload complete." });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: "something went wrong", error })
    }
}

const getAudios = async (req, res) => {
    try {
        const uploadedAudioFiles = fs.readdirSync(`${APP_ROOT_PATH}/assets/audio/`);
        return res.status(200).json({ status: true, message: "success", data: uploadedAudioFiles });
    } catch (error) {
        return res.status(500).json({ status: false, message: "something went wrong", error })
    }
}

module.exports = { ivr, audio, uploadAudio, getAudios }