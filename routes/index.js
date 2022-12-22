const indexRouter = require("express").Router();
const { ivr, audio, webhook } = require("../controllers/index")

indexRouter.post("/ivr", ivr);
indexRouter.get("/audio", audio);
indexRouter.post("/webhook", webhook);

module.exports = indexRouter