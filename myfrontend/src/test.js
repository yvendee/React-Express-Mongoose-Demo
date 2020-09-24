              <label> Name
                <input type="text" name="query" />
              </label>
              
              <label> Hospital ID
                <input type="text" name="query" />
              </label><br><br>
              <label> Region
                <input type="text" name="query" />
              </label>
              <label> Address
                <input type="text" name="query" />
              </label>
              <input type="submit" className="input-margin button" value="Submit"/>

var header = document.getElementById("mainmenu");
var btns = header.getElementsByClassName("kd-vertical-menu");

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";});
}




document.getElementById("menutile1").addEventListener("click", function() {
        document.getElementById("menutile1").innerHTML = "Hello World";
    });