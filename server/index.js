const express = require("express")
const dotenv = require('dotenv')
const db = require("./helpers/db")
const indexRoute = require('./routes/index')
const cors = require("cors")
const app = express()
const logger = require('./helpers/logger/logger')

//logger('we are in ', 'index.js')

dotenv.config({
  path:".config/config.env"
})


db()
app.use(express.json())
app.use(cors({
  origin:"*"
}))
// app.use("/",indexRoute)
// app.use((req,res,next) => {
//
//   // res.header("Access-Control-Allow-Origin", "*");
//   // res.header(
//   //   "Access-Control-Allow-Headers",
//   //   "Origin, X-Requested-With, Content-Type, Accept,"
//   // );
//   next()
// })
//

app.use('/', indexRoute)
//main route

app.use((err,req,res,next) => {
 console.error(`in index.js ${err.stack}`)
  // res.status(500).json({
  //   error:"error"
  // })
})




const port = 5000 || 4000
app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

