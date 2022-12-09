const isTokenIncluded = (req) => {
  
  console.log(`in isToken included ${req}`)
  return (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))


}

const getAccessTokenFromHeader = (req) =>{

  const authrization = req.headers.authorization;
  const accessToken = authrization.split(" ")[1];
  console.log(`access token ${accessToken}`)
  return accessToken;
}


const sendToken = (user, statusCode, res) => {
	const token = user.generateJwtFromUser();
	// console.log(user)
	// console.log(token);
  console.log("in sendtoken token is " + token)
	res.status(statusCode).json({
		success: true,
		token,
	});
};
module.exports = { sendToken , isTokenIncluded,getAccessTokenFromHeader};
