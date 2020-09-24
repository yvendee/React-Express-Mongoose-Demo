import React from "react";
import  "./Dropdown.css";


function Dropdown(props) {

	return (

		<div>
			<div className="dropdown">
                <button className="dropbtn">FilterBy</button>
                  <div className="dropdown-content">
                    <a href="#">Current Month</a>
                    <a href="#">After a Month</a>
                    <a href="#">After a Year</a>
                  </div>
             </div>
		</div>

	);
}

export default Dropdown;