const sendToken = (user, statusCode, res) => {
	const token = user.generateJwtFromUser();
	// console.log(user)
	// console.log(token);
	res.status(statusCode).json({
		success: true,
		token,
	});
};
module.exports = { sendToken };
