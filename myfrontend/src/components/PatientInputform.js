import React from "react";
import  "./PatientInputform.css";


function PatientInputform(props) {

	return (
		<div>      

          <form method="POST"> 
            <h2> Add a Patient Records </h2>
                <input type="hidden" name="useraction" value="AddPatient"/>
                <input type="hidden" name="targethospital" id="targethospital-id" value=" "/>
            <label> Citizen ID<br></br>
                <input type="text" name="upatcitizenID" required/>
            </label><br></br>
            <label> Firstname <br></br>
              <input type="text" name="upatfirstname" required/>
            </label><br></br>
            <label> Middlename <br></br>
              <input type="text" name="upatmiddlename" required/>
            </label><br></br>
            <label> Lastname <br></br>
              <input type="text" name="upatlastname" required/>
            </label><br></br>
            <label> Birthday <br></br>
              <input type="text" name="upatbirthday" required/>
            </label><br></br>
            <input type="submit" className="input-margin button" value="Submit"/>
          </form>
		</div>

	);
}

export default PatientInputform