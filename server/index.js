const express = require("express")
const dotenv = require('dotenv')
const db = require("./helpers/db")
const indexRoute = require('./routes/index')
const app = express()

dotenv.config({
  path:".config/config.env"
})


db()
app.use(express.json())
// app.use("/",indexRoute)
app.use('/', indexRoute)
//main route




const port = 5000 || 4000
app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

