const CustomError = require("../../middlewares/Error/CustomError");

const isTokenIncluded = (req) => {

  // console.log(`in isTokenIncluded ${req}`)
  // console.log('in req.headers ' + req.headers.authrization)
  if (!req.headers.authrization) {
    console.log("authorization  is not found")
    return new CustomError("authrization in headers is not found")
  } else if (req.headers.authorization.startsWith("Bearer")
  ) {
    return new CustomError("no token in authorization")
  }
  return (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))


}

const getAccessTokenFromHeader = (req) => {

  const authrization = req.headers.authorization;
  // console.log(`authrization=${authrization}`)
  const accessToken = authrization.split(" ")[1];
  if (!accessToken) {
    return new CustomError("accessToken is not found")
  }
  console.log(`access token ${accessToken}`)
  return accessToken;
}


const sendToken = (user, statusCode, res) => {
  const token = user.generateJwtFromUser();
  // console.log(user)
  // console.log(token);
  // console.log("in sendtoken token is " + token)
  res.status(statusCode).json({
    success: true,
    token,
  });
};
module.exports = { sendToken, isTokenIncluded, getAccessTokenFromHeader };
