import React from "react";
import  "./InputConfine.css";



function InputConfine(props) {

	return (
		<div>      
          <form  method="POST">  
            <h2> Add a Patient Confinement Records </h2>
            <label> Confinement Records<br></br>
                <input type="text" name="uconfinerecords" required/>
            </label><br></br>
            <input type="submit" className="input-margin button" value="Submit"/>
          </form>
		</div>

	);
}

export default InputConfine