const express = require("express")
const ErrorWrapper = require("express-async-handler")




const router = express.Router()


const addStory = ErrorWrapper( async (req, res, next) => {

  const {title, content} = req.body

  let wordCount = content.trim().split(/\s+/).length


})

// The trim() method removes whitespace from both sides of a string.
// The split() method splits a string into an array of substrings.
//
// The split() method returns the new array.
//
// The split() method does not change the original string.

module.exports = router
