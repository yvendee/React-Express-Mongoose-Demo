import React, { useState } from "react";
import  "./Accordion.css";
import Chevron from "./Chevron.js";

function Accordion(props) {

	const [setActive, setStateActive] = useState("accordion")
	const [setHeight, setStateHeight] = useState("accordion_content_fold")
	const [setRotate, setStateRotate] = useState("accordion_icon")


	function toggleAccordion() {
		
		setStateActive(setActive === "accordion" ? "accordion active" : "accordion")
		setStateHeight(setActive === "accordion" ? "accordion_content_unfold" : "accordion_content_fold")
		setStateRotate(setActive === "accordion" ? "accordion_icon rotate":"accordion_icon")
	}

	
	return (

		<div>
			<div className="accordion_section"> 
				<button className= {setActive} onClick={toggleAccordion}>
					<p className="accordion_title">{props.title}</p>
					<Chevron className={setRotate} width={10}  fill={"#7777"} />
				</button>
				<div className={setHeight}>
					<div id={props.id} className="accordion_text">
					</div>
				</div>
			</div>
		</div>

	);
}

export default Accordion;