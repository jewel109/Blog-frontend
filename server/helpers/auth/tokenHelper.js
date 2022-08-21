const isTokenIncluded = (req) => {
  
  console.log(req.headers)
  return (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))


}

const getAccessTokenFromHeader = (req) =>{

  const authrization = req.headers.authorization;
  const accessToken = authrization.split(" ")[1];

  return accessToken;
}


const sendToken = (user, statusCode, res) => {
	const token = user.generateJwtFromUser();
	// console.log(user)
	// console.log(token);
	res.status(statusCode).json({
		success: true,
		token,
	});
};
module.exports = { sendToken , isTokenIncluded,getAccessTokenFromHeader};
