const indexRouter = require("express").Router();
const { ivr, audio } = require("../controllers/index")

indexRouter.get("/ivr", ivr);
indexRouter.get("/audio", audio);

module.exports = indexRouter