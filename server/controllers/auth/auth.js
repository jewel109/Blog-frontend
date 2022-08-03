const asyncHandler = require("express-async-handler");
const User = require("../../model/user");
const { sendToken } = require("../../helpers/auth/tokenHelper");
const { comparePassword } = require('../../helpers/inputHelper');
const { findOne } = require("../../model/user");
const CustomError = require("../../middlewares/Error/CustomError");
const sendMailWithSIB = require('../../helpers/libraries/sendMailWithSIB.js');


const register = async (req, res, next) => {

  const { username, email, password } = req.body;

  try {
    // finding the user if not find then user will be null
    const user = await User.findOne({ username }).exec()
    // console.log(user)

    if (user) {

      res.status(400).json({

        success: false,
        message: `name: ${user.username} is already used`
      })

    } else {



      const userEmail = await User.findOne({ email }).exec()



      if (!userEmail) {
        const newUser = await new User({
          username,
          email,
          password,
        });

        await newUser.save()

        sendToken(newUser, 201, res)
      }

      res.status(400).json({
        success: false,
        message: `email: ${userEmail?.email} is already used `
      })
    }




  } catch (err) {
    console.error(err)
  }
};

const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select("+password")

  if (!user) {
    res.status(401).json({
      success: false,
      message: "user is not found"
    })
  }

  if (!comparePassword(password, user.password)) {
    res.status(401).json({
      success: false,
      message: 'password is not correct'
    })
  }
  sendToken(user, 201, res)

}

const forgetPassword = async (req, res) => {

  const { URI, EMAIL_USERNAME } = process.env

  const resetEmail = req.body.email
  console.log(resetEmail)

  const user = await User.findOne({ email: resetEmail }).exec()

  if (!user) {
    return new CustomError("There is no user with this email", 400)
  }

  const resetPasswordToken = await user.getResetPasswordFromUser()

  await user.save()

  const requestPasswordURI = `${URI}/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`

  const emailTemplate = `
  <h3 style="color: red" > Reset your password </h3>
  <p>This <a href=${requestPasswordURI} target="_blank">link </a>will expire in 1 hours</P>
`
  try {
    await sendMailWithSIB(resetEmail, emailTemplate)

    return res.status(200).json({
      success: true,
      message: "Email send"
    })
  } catch (error) {
    console.log(error)
  }
}

const resetPassword = async (req, res) => {
  try {
    const newPassword = req.body.password

    const { resetPasswordToken } = req.query

    console.log(resetPasswordToken)

    if (!resetPasswordToken) {
       res.status(400).json({
        success: false,
        message: "There is no token for reset the password"
      })
    }

    const user = await User.findOne({
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({
        success: false,
          message: "May be token is expired!"
      })

    }

    user.password = newPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    return res.status(201).json({
      success: true,
      message: "Reset password is successfull"
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = { register, login, forgetPassword, resetPassword }
