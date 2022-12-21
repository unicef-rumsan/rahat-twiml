const indexRouter = require("express").Router();
const {sampleMessage} = require("../controllers/index")

indexRouter.get("/getSampleMessage", sampleMessage)

module.exports = indexRouter