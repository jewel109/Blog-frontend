const ErrorWrapper = require('express-async-handler')
const User = require('../model/user')

const profile = ErrorWrapper(async(req,res) => {

  return res.status(200).json({
    success:true,
    data: req.user
  })
})


const editProfile = ErrorWrapper( async (req,res) => {

  const {username, email} = req.body

  const user = await User.findByIdAndUpdate(req.user.id, {
    username, email
  },{
      new :true,
      runValidators:true
    })

  return res.status(200).json({
    success:true,
    data:user
  })

})

const changePassword = ErrorWrapper( async( req, res ) =>{


  const {newPassword, oldPassword}  = req.body

  if()
  
})



