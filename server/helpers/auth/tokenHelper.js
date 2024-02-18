const isTokenIncluded = (req) => {

  // console.log(`in isTokenIncluded ${req}`)
  // console.log('in req.headers ' + req.headers.authrization)
  // console.log(req.headers)
  return (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))


}

const getAccessTokenFromHeader = (req) => {

  const authrization = req.headers.authorization;
  // console.log(`authrization=${authrization}`)
  const accessToken = authrization.split(" ")[1];
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
