const User = require('../../model/user')
const { sendToken } = require('../../helpers/auth/tokenHelper')
const { comparePassword } = require('../../helpers/inputHelper')
const CustomError = require('../../middlewares/Error/CustomError')
const sendMailWithSIB = require('../../helpers/libraries/sendMailWithSIB.js')

const getPrivateData = async (req, res, next) => {
  try {
    return await res.status(200).json({
      success: true,
      message: 'You got access to the private data in this route ',
      user: req.user,
    })
  } catch (error) {
    console.log(error)
    res.status(202).json({ message: 'eroor in privateData' })
  }
}

const register = async (req, res, next) => {
  const { username, email, password } = req.body

  try {
    // finding the user if not find then user will be null
    const user = await User.findOne({ username }).exec()

    const userEmail = await User.findOne({ email }).exec()

    if (user) {
      return res.status(202).json({ message: 'User  already exists ' })
    } else if (userEmail) {
      return res.status(202).json({
        message: 'Email alrea exists ',
      })
    } else {
      const newUser = await new User({
        username,
        email,
        password,
      })

      await newUser.save()

      sendToken(newUser, 201, res)
    }
    // res.status(400).json({
    //   success: false,
    //   message: `email: ${userEmail?.email} is already used `
    // })
  } catch (err) {
    console.log(`server error in register ${err}`)
    res.status(500).json({ message: 'Server error ' })
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password')
  try{
    console.log("in login " + user)
  if (!user) {
    return res.status(202).json({ message: 'No user found  ' , success:false})
  } else if (!comparePassword(password, user.password)) {
      console.log("password not matched in login")
    return res.status(202).json({ message: "User password doesn't match",success:false })
  }
  return sendToken(user, 201, res)
  }catch(err){
    console.log(`error in login ${err}`)
    res.status(500).json({message:"Server error"})
  }
}

const forgetPassword = async (req, res, next) => {
  const { URI_CLIENT, EMAIL_USERNAME } = process.env

  const resetEmail = req.body.email
  console.log(resetEmail)

  const user = await User.findOne({ email: resetEmail }).exec()

  if (!user) {
    return res.status(500).json({ message: 'No user found' })
  }

  const resetPasswordToken = await user.getResetPasswordFromUser()

  await user.save()

  const requestPasswordURI = `${URI_CLIENT}/resetpassword?resetPasswordToken=${resetPasswordToken}`

  const emailTemplate = `
  <h3 style="color: red" > Reset your password </h3>
  <p>This <a href=${requestPasswordURI} target="_blank">link </a>will expire in 1 hours</P>
`
  try {
    await sendMailWithSIB(resetEmail, emailTemplate)

    return res.status(200).json({
      success: true,
      message: 'Email send',
    })
  } catch (error) {
    console.log(error)
  }
}

const resetPassword = async (req, res) => {
  try {
    const newPassword = req.body.password
    console.log(`new password in resetpassword newPassword=${newPassword}`)
    const { resetPasswordToken } = req.query

    console.log(`in resetpassword  resetpassword=${resetPasswordToken}`)

    if (!resetPasswordToken) {
      res.status(202).json({
        success: false,
        message: 'There is no token for reset the password',
      })
    }

    const user = await User.findOne({
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(202).json({
        success: false,
        message: 'May be token is expired!',
      })
    }

    user.password = newPassword
    user.resetPasswordToken = undefined
    user.resetPassWordExpire = undefined
    
    await user.save()
    console.log(user)
    return res.status(201).json({
      success: true,
      message: 'Reset password is successfull',
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  register,
  login,
  forgetPassword,
  resetPassword,
  getPrivateData,
}
