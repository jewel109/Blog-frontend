const CustomError = require("../../middlewares/Error/CustomError");

const isTokenIncluded = (req) => {

  // console.log(`in isTokenIncluded ${req}`)
  // console.log('in req.headers ' + req.headers.authrization)
  // console.log(req.headers)

  if (!req.headers.authorization) {
    //console.log("authorization in header is not found")
    throw new Error("authrization in headers is not found")
  } else if (!req.headers.authorization.startsWith("Bearer")
  ) {

    throw new CustomError("no token in authorization")
  }
  return (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))


}

const getAccessTokenFromHeader = (req) => {

  const authorization = req.headers.authorization;
  // console.log(`authrization=${authrization}`)
  if (!authorization) {
    throw new Error("not valid authorization")
  }
  const accessToken = authorization.split(" ")[1];
  if (accessToken === "null") {
    throw new CustomError("accessToken is null")
  }
  if (!accessToken) {
    throw new CustomError("accessToken is not found")
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
