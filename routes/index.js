const indexRouter = require("express").Router();
const { ivr, audio } = require("../controllers/index")

indexRouter.post("/ivr", ivr);
indexRouter.get("/audio", audio);

module.exports = indexRouter