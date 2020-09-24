// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>


//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <p className="platform">
//           <a className="user-btn" 
//             //href="https://www.google.com"  
//             target="_blank" 
//             rel="noopener noreferrer"
//           >Submit
//           </a>
//         </p>

//       </header>
//     </div>
//   );
// }


import React, { useState } from 'react';
import './App.css';
import './Style.css';
import Accordion from "./components/Accordion"
import VerticalMenu from "./components/VerticalMenu"
import VerticalMenu2 from "./components/VerticalMenu2"
import Dropdown from "./components/Dropdown"
import Inputform from "./components/Inputform"
import PatientInputform from "./components/PatientInputform"
import InputConfine from "./components/InputConfine"
import axios from 'axios'

//import ReactDOM from 'react-dom';
//import logo from './logo.svg';

function Main(props){
  var string = "";

  function hello() {
    // axios.get('http://localhost:9000/user?action=view&hospitalname=Makati%20Medical%20Center&patientname=Patient0')
    axios.get('http://localhost:9000/testapp')
    .then(response => {
      console.log(response.data);
      var qdata = response.data
      document.getElementById("btn").innerHTML = qdata[10];
    });
  }

  function ahola() {
    var userObject = {}
    userObject = { uhospiname: "Filipino", uhospiID: "Anna", uhospiregion: "Reyes",uhospoaddress: "Garcia", upatbirthday: "September 1, 1996" };
    axios.post('http://localhost:9000/', userObject)
    .then(response => {
      console.log(response.data);
      var qdata = response.data
    });
  }

    return (
      <div>
      <h2> Hospital Management User Interface </h2>
        <div className="w3-cell-row">
          <div>
            <VerticalMenu
            />
          </div>

          <div className=" w3-panel w3-cell w3-red w3-mobile">
            <div className="initial-visible" id="VerticalMenu2-container" >
                <Dropdown
                />
                <VerticalMenu2 id="hospitallist-id"
                />
            </div>
            <div className="initial-hide" id="inputbox-container">
                <Inputform
                />
            </div>
            <div className="initial-hide" id="patient-inputbox-container">
                <PatientInputform
                />
            </div>
            <div className="initial-hide" id="confine-inputbox-container">
                <InputConfine
                />
            </div>
          </div>

          <div className="initial-hide" id="Details-container">
              <Accordion id="basic-details"
                title="Basic Details"
              />

              <Accordion 
                title="History"
              />
          </div>
      </div>        
      </div>


    );

}


export default Main;

