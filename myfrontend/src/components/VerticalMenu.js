import React, { useState } from "react";
import  "./VerticalMenu.css";
import axios from 'axios'


function VerticalMenu(props) {


	 function hello() {
    // axios.get('http://localhost:9000/user?action=view&hospitalname=Makati%20Medical%20Center&patientname=Patient0')
    	axios.get('http://localhost:9000/testapp')
    	.then(response => {
      	console.log(response.data);
      	var qdata = response.data;
      	document.getElementById("btn").innerHTML = qdata[0];
    	});
  	}


	function RequestViewHospital1(patienname) {
		var stringdata = document.getElementById(patienname).innerText;
	 	document.getElementById("loader-container").style.display="initial"
		document.getElementById("VerticalMenu2-container").style.display="none";
		document.getElementById("inputbox-container").style.display="none"
		document.getElementById("Details-container").style.display="none"
		document.getElementById("list-container").style.display="none"
		document.getElementById("patient-inputbox-container").style.display="none"
		document.getElementById("confine-inputbox-container").style.display="initial"
	}

	function RequestViewHospital(optidnum) {
 		var hospitalname = document.getElementById(optidnum).innerText;
 		document.getElementById("loader-container").style.display="initial"
		document.getElementById("list-container").style.display="none"
		document.getElementById("patient-inputbox-container").style.display="none"
		document.getElementById("confine-inputbox-container").style.display="none"

		var idata = [];

		axios.get('http://localhost:9000/testapp')
		.then(response => {
	  		console.log(response.data);
	  		idata = response.data;

			var text = "";
			var i;
			var optid = "";
			var optdata = "";
			var parse = "";

			text+= hospitalname + ' selected!'
			for (i = 0; i < idata.length; i++) {
				parse = "opt" + i.toString()
				if(parse == optidnum) {
					// text += '<a class="active" href="user?action=view&hospitalname=' + hostpitalname + '&patientname=' + idata[i] + '" ' + 'id="opt' + i.toString() + '">' + idata[i] + '</a>'; 
					text += '<a class="active" ' + 'id="opt' + i.toString() + '">' + idata[i] + '</a>'; 
				}
				else {
						text += '<a ' + 'id="opt' + i.toString() + '">' + idata[i] + '</a>';				
				}
			}


			document.getElementById("hospitallist-id").innerHTML = text;
			document.getElementById("loader-container").style.display="initial"
			document.getElementById("Details-container").style.display="initial"
			document.getElementById("basic-details").innerHTML = "No Record Shown";

			//requesting hospital data
			var link = 'http://localhost:9000/user?action=hospiinfo&hospitalname=' + hospitalname;
			axios.get(link)
	    	.then(response => {
	      	// console.log(response.data);
	      	var details = 'Hospital Name: ' + response.data.HospitalName + '</br>'
	      	            + 'Hospital ID: ' + response.data.HospitalID + '<br>'
	      	            + 'Region: ' + response.data.Region + '</br>'
	      	            + 'Address: ' + response.data.Address + '</br>'
	      				document.getElementById("basic-details").innerHTML = details;
	    	});

			for (i = 0; i < idata.length; i++) {
	  				optid = 'opt' + i.toString(); 
	  				document.getElementById(optid).onclick = function() {RequestViewHospital(this.id)};	
			}

		});
	}


	function requestDeletePatient1(optidnum, hospitalname) {
	 	var patientname = document.getElementById(optidnum).innerText;
		document.getElementById("loader-container").style.display="initial"
  		document.getElementById("list-container").style.display="none"
  		document.getElementById("Details-container").style.display="none"
		document.getElementById("VerticalMenu2-container").style.display="initial";
		document.getElementById("patient-inputbox-container").style.display="none"
		document.getElementById("confine-inputbox-container").style.display="none"

		var idata = {}; 
		var link = 'http://localhost:9000/user?action=deletepatient&hospitalname=' + hospitalname + '&patientname=' + patientname;
		axios.get(link)
    	.then(response => {
      	//console.log(response.data);
      	if(response.data.patientname  == null) {
      		alert(" No Response! Please Try Again Later")
      		//alert(patientname + " has been deleted from " + hospitalname)

	      	var idata = [];
			var link = 'http://localhost:9000/user?action=query&hospitalname=' + hospitalname;
	  		//axios.get('http://localhost:9000/testapp1')
	  		axios.get(link)
	    	.then(response => {
	      	console.log(response.data);
	      	idata = response.data;


			var text = "";
			var i;
			var optid = "";
			var optdata = "";
				text+= 'Delete a Patient Records?'
				for (i = 0; i < idata.length; i++) {
	  				text += '<a ' + 'id="opt' + i.toString() + '">' + idata[i] + '</a>'; 				
				}

			document.getElementById("hospitallist-id").innerHTML = text;
			document.getElementById("loader-container").style.display="initial"

			for (i = 0; i < idata.length; i++) {

	  				optid = 'opt' + i.toString(); 
	  				document.getElementById(optid).onclick = function() {requestDeletePatient1(this.id, hospitalname)};	
			}
			});




      	}
      	else {
      		alert(response.data.patientname + " has been deleted from " + hospitalname)

	      	var idata = [];
			var link = 'http://localhost:9000/user?action=query&hospitalname=' + hospitalname;
	  		//axios.get('http://localhost:9000/testapp1')
	  		axios.get(link)
	    	.then(response => {
	      	console.log(response.data);
	      	idata = response.data;

			var text = "";
			var i;
			var optid = "";
			var optdata = "";
				text+= 'Delete a Patient Records?'
				for (i = 0; i < idata.length; i++) {
	  				text += '<a ' + 'id="opt' + i.toString() + '">' + idata[i] + '</a>'; 				
				}

			document.getElementById("hospitallist-id").innerHTML = text;
			document.getElementById("loader-container").style.display="initial"

			for (i = 0; i < idata.length; i++) {

	  				optid = 'opt' + i.toString(); 
	  				document.getElementById(optid).onclick = function() {requestDeletePatient1(this.id, hospitalname)};	
			}
			});
      	}

      	});
	}


	function requestDeletePatient(optid) {
 		var hospitalname = document.getElementById(optid).innerText;
 		document.getElementById("loader-container").style.display="initial"
		document.getElementById("list-container").style.display="none"
		document.getElementById("patient-inputbox-container").style.display="none"
		document.getElementById("confine-inputbox-container").style.display="none"

		var idata = [];
		var link = 'http://localhost:9000/user?action=query&hospitalname=' + hospitalname;
  		//axios.get('http://localhost:9000/testapp1')
  		axios.get(link)
    	.then(response => {
      	console.log(response.data);
      	idata = response.data;


		var text = "";
		var i;
		var optid = "";
		var optdata = "";
			text+= 'Delete a Patient Records?'
			for (i = 0; i < idata.length; i++) {
  				text += '<a ' + 'id="opt' + i.toString() + '">' + idata[i] + '</a>'; 				
			}

		document.getElementById("hospitallist-id").innerHTML = text;
		document.getElementById("loader-container").style.display="initial"

		for (i = 0; i < idata.length; i++) {

  				optid = 'opt' + i.toString(); 
  				document.getElementById(optid).onclick = function() {requestDeletePatient1(this.id, hospitalname)};	
		}
		});
	}


	function requestAddPatient(patiennameid, hospitalnamepass) {
		//var stringdata = document.getElementById(patienname).innerText;
	 	document.getElementById("loader-container").style.display="initial"
		document.getElementById("VerticalMenu2-container").style.display="none";
		document.getElementById("inputbox-container").style.display="none"
		document.getElementById("Details-container").style.display="none"
		document.getElementById("list-container").style.display="none"
		document.getElementById("patient-inputbox-container").style.display="initial"
		document.getElementById("confine-inputbox-container").style.display="none"
		document.getElementById("targethospital-id").value = hospitalnamepass;
	}

	function requestDeleteHospital(idopt) {

		var hospitalname = document.getElementById(idopt).innerText;
	 	document.getElementById("loader-container").style.display="initial"
  		document.getElementById("list-container").style.display="none"
  		document.getElementById("Details-container").style.display="none"
		
		document.getElementById("VerticalMenu2-container").style.display="none";
		document.getElementById("patient-inputbox-container").style.display="none"
		document.getElementById("confine-inputbox-container").style.display="none"

		var idata = {};
		axios.get('http://localhost:9000/user?action=delete&hospitalname=' + hospitalname)
    	.then(response => {
      	//console.log(response.data);
      	if(response.data.hospitalname  == null) {
      		alert(" No Response! Please Try Again Later")
      	}
      	else {
      		alert(response.data.hospitalname + " Has Been Deleted")
      	}

      	
      	});
		//send data here to the database

	}


	function sendData1(optidnum, hostpitalname) {
	 	var patienttext = document.getElementById(optidnum).innerText;
	 	document.getElementById("loader-container").style.display="initial"
  		document.getElementById("list-container").style.display="none"
  		document.getElementById("patient-inputbox-container").style.display="none"
  		document.getElementById("confine-inputbox-container").style.display="none"

  		var idata = [];

  		var link = 'http://localhost:9000/user?action=query&hospitalname=' + hostpitalname;
  		//axios.get('http://localhost:9000/testapp1')
  		axios.get(link)
    	.then(response => {
      	console.log(response.data);
      	idata = response.data;

		var text = "";
		var i;
		var optid = "";
		var optdata = "";
		var parse = "";

			text += patienttext + ' selected!'

			for (i = 0; i < idata.length; i++) {
				parse = "opt" + i.toString()
				if(parse == optidnum) {
					// text += '<a class="active" href="user?action=view&hospitalname=' + hostpitalname + '&patientname=' + idata[i] + '" ' + 'id="opt' + i.toString() + '">' + idata[i] + '</a>'; 
					text += '<a class="active" ' + 'id="opt' + i.toString() + '">' + idata[i] + '</a>'; 
				}
				else {
  					text += '<a ' + 'id="opt' + i.toString() + '">' + idata[i] + '</a>';				
				}
			}


		document.getElementById("hospitallist-id").innerHTML = text;
		document.getElementById("loader-container").style.display="initial"

    	document.getElementById("basic-details").innerHTML = "No Record Shown";
    	document.getElementById("Details-container").style.display="initial"
		
		//requesting patient data
		var link = 'http://localhost:9000/user?action=view&hospitalname=' + hostpitalname + '&patientname=' + patienttext;
		//var link = 'http://localhost:9000/testapp2'
		axios.get(link)
    	.then(response => {
      	// console.log(response.data);
      	var details = 'CitizenID: ' + response.data.CitizenID + '</br>'
      	            + 'Fullname: ' + response.data.Firstname + '<br>'
      	            + 'Birthday: ' + response.data.Birthday + '</br>';
      	document.getElementById("basic-details").innerHTML = details;
    	});


		for (i = 0; i < idata.length; i++) {

  				optid = 'opt' + i.toString(); 
  				document.getElementById(optid).onclick = function() {sendData1(this.id, hostpitalname)};	
		}
		});
	}	


	function sendData(optid) {
	 	var shostpitalname = document.getElementById(optid).innerText;
	 	document.getElementById("loader-container").style.display="initial"
  		document.getElementById("list-container").style.display="none"
  		document.getElementById("patient-inputbox-container").style.display="none"
  		document.getElementById("confine-inputbox-container").style.display="none"
		// alert(stringdata)

		var idata = [];
		var link = 'http://localhost:9000/user?action=query&hospitalname=' + shostpitalname;
		axios.get(link)
    	.then(response => {
      	console.log(response.data);
      	idata = response.data;

      	var text = "";
		var i;
		var optid = "";
		var optdata = "";
			text+= 'Select a Patient'
			for (i = 0; i < idata.length; i++) {
  				//text += '<a href="user?action=view&hospitalname=' + shostpitalname + '&patientname=' + idata[i] + '" ' + 'id="opt' + i.toString() + '">' + idata[i] + '</a>'; 
  				text += '<a ' + 'id="opt' + i.toString() + '">' + idata[i] + '</a>'; 					
			}

		document.getElementById("hospitallist-id").innerHTML = text;
		document.getElementById("loader-container").style.display="initial"

		for (i = 0; i < idata.length; i++) {

  				optid = 'opt' + i.toString(); 
  				document.getElementById(optid).onclick = function() {sendData1(this.id, shostpitalname)};	
		}

    	});
	}	

	
	function HospitalList() {

		document.getElementById("VerticalMenu2-container").style.display="initial";
		document.getElementById("inputbox-container").style.display="none";
		document.getElementById("list-container").style.display="none"
		document.getElementById("Details-container").style.display="none"
		document.getElementById("patient-inputbox-container").style.display="none"
		document.getElementById("confine-inputbox-container").style.display="none"

		var idata = [];

		axios.get('http://localhost:9000/testapp')
    	.then(response => {
      	//console.log(response.data);
      	idata = response.data;
      	//alert(idata)
      	//document.getElementById("btn").innerHTML = qdata[0];
      	var text = "";
		var i;
		var optid = "";
		var optdata = "";
			text+= 'Select a Hospital'
			for (i = 0; i < idata.length; i++) {
  				text += '<a ' + 'id="opt' + i.toString() + '">' + idata[i] + '</a>'; 				
			}

		document.getElementById("hospitallist-id").innerHTML = text;
		document.getElementById("loader-container").style.display="initial"

		for (i = 0; i < idata.length; i++) {

  				optid = 'opt' + i.toString(); 
  				document.getElementById(optid).onclick = function() {sendData(this.id)};	
		}

      	//
    	});
	}

	function AddHospital() {
		document.getElementById("VerticalMenu2-container").style.display="none";
		document.getElementById("inputbox-container").style.display="initial"
		document.getElementById("Details-container").style.display="none"
		document.getElementById("list-container").style.display="none"
		document.getElementById("patient-inputbox-container").style.display="none"
		document.getElementById("confine-inputbox-container").style.display="none"
	}

	function AddPatient() {
		document.getElementById("VerticalMenu2-container").style.display="initial";
		document.getElementById("inputbox-container").style.display="none";
		document.getElementById("loader-container").style.display="initial"
		document.getElementById("Details-container").style.display="none"
		document.getElementById("list-container").style.display="none"
		document.getElementById("patient-inputbox-container").style.display="none"
		document.getElementById("confine-inputbox-container").style.display="none"


		var idata = [];

  		axios.get('http://localhost:9000/testapp')
    	.then(response => {
      	console.log(response.data);
      	idata = response.data;

		var text = "";
		var i;
		var optid = "";
		var optdata = "";
			text+= 'Select a Hospital'
			for (i = 0; i < idata.length; i++) {
  				text += '<a ' + 'id="opt' + i.toString() + '">' + idata[i] + '</a>'; 				
			}

		document.getElementById("hospitallist-id").innerHTML = text;
		document.getElementById("loader-container").style.display="initial"
		for (i = 0; i < idata.length; i++) {

  				optid = 'opt' + i.toString(); 
  				document.getElementById(optid).onclick = function() {requestAddPatient(this.id, this.innerText)};	
		}

		});
	}

	function DeleteHospital() {
		document.getElementById("VerticalMenu2-container").style.display="initial";
		document.getElementById("inputbox-container").style.display="none";
		document.getElementById("loader-container").style.display="initial"
		document.getElementById("list-container").style.display="none"
		document.getElementById("Details-container").style.display="none"
		document.getElementById("patient-inputbox-container").style.display="none"
		document.getElementById("confine-inputbox-container").style.display="none"


		var idata = [];
  		axios.get('http://localhost:9000/testapp')
    	.then(response => {
      	console.log(response.data);
      	idata = response.data;

		var text = "";
		var i;
		var optid = "";
		var optdata = "";
			text+= 'Delete a Hospital Records?'
			for (i = 0; i < idata.length; i++) {
  				text += '<a ' + 'id="opt' + i.toString() + '">' + idata[i] + '</a>'; 				
			}

		document.getElementById("hospitallist-id").innerHTML = text;
		document.getElementById("loader-container").style.display="initial"

		for (i = 0; i < idata.length; i++) {

  				optid = 'opt' + i.toString(); 
  				document.getElementById(optid).onclick = function() {requestDeleteHospital(this.id)};	
		}
		});
	}

	function DeletePatient() {
		document.getElementById("VerticalMenu2-container").style.display="initial";
		document.getElementById("inputbox-container").style.display="none";
		document.getElementById("list-container").style.display="none"
		document.getElementById("Details-container").style.display="none"
		document.getElementById("patient-inputbox-container").style.display="none"
		document.getElementById("confine-inputbox-container").style.display="none"

		var idata = [];

  		axios.get('http://localhost:9000/testapp')
    	.then(response => {
      	console.log(response.data);
      	idata = response.data;

		var text = "";
		var i;
		var optid = "";
		var optdata = "";
			text+= 'Select a Hospital'
			for (i = 0; i < idata.length; i++) {
  				text += '<a  ' + 'id="opt' + i.toString() + '">' + idata[i] + '</a>'; 				
			}

		document.getElementById("hospitallist-id").innerHTML = text;
		document.getElementById("loader-container").style.display="initial"

		for (i = 0; i < idata.length; i++) {

  				optid = 'opt' + i.toString(); 
  				document.getElementById(optid).onclick = function() {requestDeletePatient(this.id, this.innerText)};	
		}
		});
	}

	function ViewHospital() {
		document.getElementById("VerticalMenu2-container").style.display="initial";
		document.getElementById("inputbox-container").style.display="none";
		document.getElementById("list-container").style.display="none"
		document.getElementById("Details-container").style.display="none"
		document.getElementById("patient-inputbox-container").style.display="none"
		document.getElementById("confine-inputbox-container").style.display="none"

		var idata = [];

  		axios.get('http://localhost:9000/testapp')
    	.then(response => {
      	console.log(response.data);
      	idata = response.data;


		var text = "";
		var i;
		var optid = "";
		var optdata = "";
			text+= 'Select a Hospital'
			for (i = 0; i < idata.length; i++) {
  				text += '<a ' + 'id="opt' + i.toString() + '">' + idata[i] + '</a>'; 				
			}

		document.getElementById("hospitallist-id").innerHTML = text;
		document.getElementById("loader-container").style.display="initial"

		for (i = 0; i < idata.length; i++) {

  				optid = 'opt' + i.toString(); 
  				document.getElementById(optid).onclick = function() {RequestViewHospital(this.id)};	
		}
		});
	}

	return (
		<div>
			<div  id="mainmenu" className="kd-vertical-menu kd-font" id={props.content}> 
            	<a id="menutile1" onClick={HospitalList}>View Patient</a>
            	<a id="menutile2" onClick={AddHospital}>Add Hospital </a>
            	<a id="menutile3" onClick={AddPatient}>Add Patient</a>
            	<a id="menutile4" onClick={DeleteHospital}>Delete Hospital</a>
            	<a id="menutile5" onClick={DeletePatient}>Delete Patient</a>
            	<a id="menutile6" onClick={ViewHospital} >View Hospital</a>
			</div>
		</div>

	);
}

export default VerticalMenu;