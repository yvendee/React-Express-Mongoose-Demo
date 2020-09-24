var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;
var userModelSchema = new Schema(
	{
		hospitalname: String,
		hospitalID: String,
		region: String,
		address: String,
	}, 
	{collection: 'hospitalData'}
);

//compile
var userModel = mongoose.model(
	'_userModel',     //query object
	userModelSchema);

var data = [];

router.get("/",function(req,res,next){
	mongoose.connect('mongodb://localhost/testdb', {useNewUrlParser: true, useUnifiedTopology: true});
	userModel.find(function(err,result){
	if(err)
	{
		return console.error(err)
		mongoose.connection.close();
		res.send("no response!");
	}
	else 
	{	
		var i;
		for (i = 0; i < result.length; i++) {
				data.push(result[i].hospitalname);	
		}
		
		res.send(data);
		data = [];
		mongoose.connection.close();
	}
	})
});

module.exports=router;