const indexRouter = require("express").Router();
const { ivr, audio, uploadAudio, getAudios, playAudio} = require("../controllers/index")

// indexRouter.post("/ivr", ivr);
indexRouter.get("/audio/:audioFile", audio);
indexRouter.post("/upload-audio", uploadAudio);
indexRouter.get("/uploaded-audios", getAudios);

module.exports = indexRouter