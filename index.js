require("dotenv").config();
const cors = require("cors");
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const indexRouter = require("./routes/index")

app.use(cors())

app.use(express.static('assets'))

app.use('/api/v1', indexRouter)

app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello from twilio markup API" })
})

app.use("*", (req,res) => {
    res.status(404).json({ message: "route not found "});
})

app.listen(port, () => {
  console.log(`application listening on port: ${port}`)
})