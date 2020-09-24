import React from "react";
import  "./Inputform.css";



function Inputform(props) {

	return (
		<div>
            <form id="send" method="POST"> 
            <h2> Add a Hospital Records </h2>
              <label name="label"> Name <br></br>
                <input type="text" id='fbtn0' name="uhospiname" required/>
              </label><br></br>
              <label> Hospital ID <br></br>
                <input type="text" id='fbtn1' name="uhospiID" required/>
              </label><br></br>
              <label> Region <br></br>
                <input type="text" id='fbtn2' name="uhospiregion" required/>
              </label><br></br>
              <label> Address <br></br>
                <input type="text" id='fbtn3' name="uhospoaddress" required/>
              </label><br></br>
              <input type="submit" className="input-margin button" value="Submit"/>
            </form>
		</div>

	);
}

export default Inputform;