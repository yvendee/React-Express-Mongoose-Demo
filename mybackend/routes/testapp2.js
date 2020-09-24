

var express = require('express');
var router = express.Router();
var object = { CitizenID: "Filipino", 
				Firstname: "Anna", 
				Middlename: "Reyes", 
				Lastname: "Garcia", 
				Birthday: "September 1, 1996" };


router.get("/",function(req,res,next){
		res.json(object);
});

module.exports=router;