const asyncError  = require("express-async-handler");
const jwt = require("jsonwebtoken")
const { isTokenIncluded, getAccessTokenFromHeader } = require("../../helpers/auth/tokenHelper");
const User = require("../../model/user");
const CustomError = require("../Error/CustomError");

const getAccessToRoute = asyncError(async(req,res,next) =>{

  const {JWT_SECRET} = process.env

  if(!isTokenIncluded(req)){
    return next(new CustomError("You are not athorized to access this route"), 401)
  }

  const accessToken = getAccessTokenFromHeader(req)

  const decoded = jwt.verify(accessToken, JWT_SECRET)

  const user = await User.findById(decoded.id)

  if(!user){
    return next(new CustomError("You are not athorized to access this route"), 401)
  }
  
  req.user = user

	next();
})

module.exports = {getAccessToRoute}
