const asyncError = require('express-async-handler')
const jwt = require('jsonwebtoken')
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require('../../helpers/auth/tokenHelper')
const User = require('../../model/user')
const CustomError = require('../Error/CustomError')
const { log, chalk } = require('../../controllers/comment/comment')

const getAccessToRoute = asyncError(async (req, res, next) => {
  const { JWT_SECRET } = process.env

  if (!isTokenIncluded(req)) {
    log(chalk("no token found"))
    return res.status(500).json({
      success: false,
      message: 'No token found',
    })
  }

  const accessToken = getAccessTokenFromHeader(req)

  if (accessToken == 'null') {
    return res
      .status(200)
      .json({ success: false, message: 'not valid jsonwebtoken ' })
  } else if (accessToken != 'null') {
    const decoded = jwt.verify(accessToken, JWT_SECRET)

    console.log(`decoded jsonwebtoken ${decoded}`)

    const user = await User.findById(decoded.id)
    console.log(`in accessroute ${user}`)
    if (!user) {
      console.log('no user')
      return res.status(201).json({
        success: false,
        message: 'No user found',
      })
    }

    req.user = user
    next()
  }
})

module.exports = { getAccessToRoute }
