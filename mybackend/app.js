var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var querystr = require('querystring');

//Mongoose
const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/testdb', {useNewUrlParser: true, useUnifiedTopology: true});
var Schema = mongoose.Schema;

var hospitalModelSchema = new Schema(
	{
		hospitalname: Object,
		hospitalID: Object,
		region: Object,
		address: Object,


	}
);


//compiled for hospital
var hospitalModel = mongoose.model(
	'hospitalModel',     //query object
	hospitalModelSchema, 
 	'hospitalData'		 //collection name
 );


var patientdataModelSchema = new Schema(
	{
		currenthospital: Object,
		firstname: Object,
		citizenID: Object,
		birthday: Object

	}
);


//compiled for patient
var patientdataModel = mongoose.model(
	'patientdataModel',     //query object
	patientdataModelSchema, 
 	'patientData'		 //collection name
 );


var data = [];
var jsondata = {}
//var hospital_object = {}

//routers
testappRouter = require('./routes/testapp'); // user-defined for response testing
testapp1Router = require('./routes/testapp1'); // user-defined for response testing
testapp2Router = require('./routes/testapp2'); // user-defined for response testing
//testapp3Router = require('./routes/testapp3'); // user-defined for response testing

var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

//user-defined
var url = require('url');


var objectLength = "";
var list_patient = [];

var hospital_name = "";
var hospital_ID = "";
var hospital_region = "";
var hospital_address = "";

var user_action = "";
var atargethospital = "";
var patient_citizenID = "";
var patient_firstname = "";
var patient_middlename = "";
var patient_lastname = "";
var patient_birthday = "";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());                        //user-define for testing
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testapp", testappRouter);  // user-defined for response testing / define the URL
app.use("/testapp1", testapp1Router);  // user-defined for response testing / define the URL
app.use("/testapp2", testapp2Router);  // user-defined for response testing / define the URL
//app.use("/testapp3", testapp3Router);  // user-defined for response testing / define the URL

//serving static files(user-defined)
app.use(express.static('public'))

//user-defined routes
app.get('/:id', function (req, res) {

	var queryData = req.query;
	var action = queryData.action
	//console.log(action)

	if(action == "hospiinfo"){
		var qhospitalname = queryData.hospitalname;

		mongoose.connect('mongodb://localhost/testdb', {useNewUrlParser: true, useUnifiedTopology: true});
		hospitalModel.findOne({hospitalname: {$eq:qhospitalname}}, function (err, docs) { 
		    if (err){ 
		        console.log(err) 
		        mongoose.connection.close();
		        //hospital_object = {}
		    } 
		    else{ 

	    		var hospital_object = {
	  	     		HospitalName:docs.hospitalname,
	  	     		HospitalID:docs.hospitalID,
	  	     		Region:docs.region,
	  	     		Address:docs.address
	  	     	}
	  	   		//console.log(docs.hospitalID);
	        	mongoose.connection.close(); 
		    }
		    res.send(hospital_object);
		}); 

		// var hospital_object = {
	 //  	     	HospitalName:qhospitalname,
	 //  	     	HospitalID:"tttasaas",
	 //  	     	Region:"asasas",
	 //  	     	Address:"ssssssasaas"
	 //  	     	};

		


	}

	if(action == "deletepatient") {
		var ddpatientname = queryData.patientname
		mongoose.connect('mongodb://localhost/testdb', {useNewUrlParser: true, useUnifiedTopology: true});
		patientdataModel.deleteMany({ firstname: { $eq:ddpatientname } }).then(function(){ 
			mongoose.connection.close();
			data = {patientname: ddpatientname};
			res.send(data);
		}).catch(function(error){ 
			mongoose.connection.close();
			res.send("error");
		}); 
	}

	if(action == "delete") {
		var hospiname = queryData.hospitalname
		//console.log(hospiname + " deleted")

		mongoose.connect('mongodb://localhost/testdb', {useNewUrlParser: true, useUnifiedTopology: true});
		hospitalModel.deleteMany({ hospitalname: { $eq:hospiname } }).then(function(){ 
    		//
    		mongoose.connect('mongodb://localhost/testdb', {useNewUrlParser: true, useUnifiedTopology: true});
			patientdataModel.deleteMany({ currenthospital: { $eq:hospiname } }).then(function(){ 
    		//console.log("Data deleted"); 
    		mongoose.connection.close();
			}).catch(function(error){ 
    		console.log(error); 
    		mongoose.connection.close();
			}); 

    		//
		}).catch(function(error){ 
    	console.log(error); 

    		mongoose.connection.close();
		}); 

		data = {hospitalname: hospiname};
		res.send(data); 
	}

	if(action == "view") {
		//console.log(action)
		//var hospiname = queryData.hospitalname
		var patname = queryData.patientname;
		//console.log(patname)
		//var patname = 'Aquino Kris Conquanco ';
		mongoose.connect('mongodb://localhost/testdb', {useNewUrlParser: true, useUnifiedTopology: true});
		patientdataModel.findOne({firstname: {$eq:patname}}, function (err, docs) { 
    	if (err){ 
        	console.log(err) 
        	mongoose.connection.close();
    	} 
    	else{ 
    		//console.log(docs);
    		mongoose.connection.close();

    		//console.log(docs);

        	jsondata = { 
        		CitizenID:docs.citizenID, 
        		Firstname:docs.firstname,
        		Birthday:docs.birthday
        	};

        	//data = jsondata;
        	//data = "";
       		res.send(jsondata); 
    
    	} 
		});
		
	} //view


	if(action == "query"){

		//console.log(action)
		var hospiname = queryData.hospitalname
		mongoose.connect('mongodb://localhost/testdb', {useNewUrlParser: true, useUnifiedTopology: true});
		patientdataModel.find({currenthospital: {$eq:hospiname}}, function (err, docs) { 
    	if (err){ 
        	console.log(err) 
        	mongoose.connection.close();
    	} 
    	else{ 
    		

     		objectLength = Object.keys(docs).length // get the number of JSON object
     
     		for (i = 0; i < objectLength; i++) {
        		list_patient.push(docs[i].firstname)
    		}

    		mongoose.connection.close();
		    res.send(list_patient);
		    objectLength = "";
			list_patient = [];
		    
    	}

		});

	}

	
})

//*****will handle post request
// app.post('/', function (req, res) {
//   res.send('POST request to the homepage')
//  })


//user-defined parser 
var bodyParser = require('body-parser');
app.use(bodyParser());

//*****will handle post request, for testing
// app.post('/', function(req, resp){
// 	resp.end(JSON.stringify(req.body));
// 	resp.send()
// })

app.post('/', function(req, resp){
	// resp.send( {data: req.body});
	//resp.send(req.body.uhospiname)
		//resp.send("Done! ");
	//*** add hospital form
	
	// hospital_name = JSON.stringify(req.body.uhospiname);
	// hospital_ID = JSON.stringify(req.body.uhospiID);
	// hospital_region = JSON.stringify(req.body.uhospiregion);
	// hospital_address = JSON.stringify(req.body.uhospoaddress);

	hospital_name = req.body.uhospiname;
	hospital_ID = req.body.uhospiID;
	hospital_region = req.body.uhospiregion;
	hospital_address = req.body.uhospoaddress;

	if(req.body.uhospiname === undefined) {}
	else
	{
		//Mongoose
		mongoose.connect('mongodb://localhost/testdb', {useNewUrlParser: true, useUnifiedTopology: true});
		 var data ={
			hospitalname:hospital_name, hospitalID:hospital_ID, region:hospital_region, address:hospital_address
		};

		// var parse_data = JSON.parse(data);

		hospitalModel.collection.insert(data, function(err,result){
			if(err)
			{
				return console.error(err)
				mongoose.connection.close();
			}
			else 
			{
				//console.log("multiple insert")
				mongoose.connection.close();
			}
		})

	}


	//*** add patient form
	// user_action = JSON.stringify(req.body.useraction);
	// atargethospital = JSON.stringify(req.body.targethospital);
	// patient_citizenID = JSON.stringify(req.body.upatcitizenID);
	// patient_firstname = JSON.stringify(req.body.upatfirstname);
	// patient_middlename = JSON.stringify(req.body.upatmiddlename);
	// patient_lastname = JSON.stringify(req.body.upatlastname);
	// patient_birthday = JSON.stringify(req.body.upatbirthday);

	user_action = req.body.useraction;
	atargethospital = req.body.targethospital;
	patient_citizenID = req.body.upatcitizenID;
	patient_firstname = req.body.upatfirstname;
	patient_middlename = req.body.upatmiddlename;
	patient_lastname = req.body.upatlastname;
	patient_birthday = req.body.upatbirthday;

	if(user_action === undefined) {}
	else {
		if(user_action.includes("AddPatient")) {
		//Mongoose
		mongoose.connect('mongodb://localhost/testdb', {useNewUrlParser: true, useUnifiedTopology: true});
		 var patdetailsdata = {
			currenthospital:atargethospital , citizenID:patient_citizenID, firstname:patient_lastname +  " " + patient_firstname + " " +patient_middlename, birthday:patient_birthday
		};

		patientdataModel.collection.insert(patdetailsdata, function(err,result){
			if(err)
			{
				return console.error(err)
				mongoose.connection.close();
			}
			else 
			{
				mongoose.connection.close();
			}
		})
		
		}

	}
	

	resp.end("Done!");
	//resp.end(JSON.stringify(req.body));
	//resp.send("Name: " + JSON.stringify(req.body.uhospiname))
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
