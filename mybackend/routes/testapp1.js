var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;
var userModelSchema = new Schema(
	{
		currenthospital: Object,
		citizenID: Object,
		firstname: Object,
		middlename: Object,
		lastname: Object,
		birthday: Object
	}, 
	{collection: 'patientData'}
);

//compile
var patientModel = mongoose.model(
	'patientModel',     //query object
	userModelSchema);

var data = [];

router.get("/",function(req,res,next){
	mongoose.connect('mongodb://localhost/testdb', {useNewUrlParser: true, useUnifiedTopology: true});
	
	var thospitalname = 'Fortmed';
	patientModel.find({currenthospital: {$eq:thospitalname}}, function (err, docs) { 
    if (err){ 
        console.log(err) 
        mongoose.connection.close();
    } 
    else{ 

     var objectLength = "";
     var list_patient = [];

     objectLength = Object.keys(docs).length // get the number of JSON object
     
     for (i = 0; i < objectLength; i++) {
        list_patient.push(docs[i].firstname)

    }

     	//console.log(docs)
     	//console.log(objectLength);
     	//console.log(list_patient);
    	mongoose.connection.close();
    	res.send(list_patient);
		data = [];
    } 
    }); 

	///
	// patientModel.find(function(err,result){
	// if(err)
	// {
	// 	return console.error(err)
	// 	mongoose.connection.close();
	// }
	// else 
	// {	
	// 	var i;
	// 	for (i = 0; i < result.length; i++) {
	// 			data.push(result[i].firstname);
	// 	}
	// 	mongoose.connection.close();
	// 	res.send(data);
	// 	data = [];
	// }
	// })
	// //
});

module.exports=router;