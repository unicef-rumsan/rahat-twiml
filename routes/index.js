const indexRouter = require("express").Router();
const {
  ivr,
  audio,
  uploadAudio,
  getAudios,
  deleteAudio,
  createCall,
} = require("../controllers/index");

// indexRouter.post("/ivr", ivr);
indexRouter.get("/audio/:audioFile", audio);
indexRouter.delete("/audio/:audioFile", deleteAudio);
indexRouter.post("/upload-audio", uploadAudio);
indexRouter.get("/uploaded-audios", getAudios);
indexRouter.post("/create-call", createCall);

module.exports = indexRouter;
