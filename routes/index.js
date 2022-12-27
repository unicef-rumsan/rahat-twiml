const indexRouter = require("express").Router();
const { ivr, audio, webhook, wardOne } = require("../controllers/index")

indexRouter.post("/ivr", ivr);
indexRouter.get("/audio", audio);
indexRouter.post("/webhook", webhook);
indexRouter.get("/ward-1", wardOne);


module.exports = indexRouter