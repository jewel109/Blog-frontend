const asyncError  = require("express-async-handler");

const getAccessToRoute = asyncError(async(req,res,next) =>{


	next();
})
