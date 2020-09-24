import React from "react";
import  "./VerticalMenu2.css";
import Loader from "./Loader.js"


function VerticalMenu2(props) {



	var myVar = setInterval(myTimer ,3000);
	function myTimer() {
  		document.getElementById("loader-container").style.display="none"
  		document.getElementById("list-container").style.display="initial"
	}

	return (
		<div>
			<div className="loader-initial-show" id="loader-container">
				<Loader
				/>
			</div>
			<div className="k-initial-hide" id="list-container">
				<div className="k-vertical-menu k-font" id={props.id}> No Shown Records
            	</div>
            </div>
		</div>

	);
}

export default VerticalMenu2;