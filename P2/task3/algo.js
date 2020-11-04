var info = document.getElementById("info");
var systemOfTemp = document.getElementById("systemOftemp");
var cityInp = document.getElementById("cityInp");
var updateBut = document.getElementById("updateBut");
var infoErrorDiv = document.getElementById("errorDiv");
var infoAcceptDiv = document.getElementById("acceptDiv");

var infoCityNameDiv = document.getElementById("cityNameDiv");
// var infoDateDiv = document.getElementById("dateDiv");
// var infoTemperatureDiv = document.getElementById("temperatureDiv");

function update(cityName) {
  console.log("was called update function");
  console.log(cityInp.value);

  var apiKey = "a3cee816cfe1cbe02e83c52285a3a8e8";
  var url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    apiKey;

  console.log("url: " + url);

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      showData(data);
    });
}

function showData(data) {
  if (data.cod.match(/2/)) {
    var acceptTemplat = document.getElementById("acceptDiv-temp");
    console.log(acceptTemplat);

    infoErrorDiv.style.display = "none";
    infoAcceptDiv.style.display = "block";
    var cityName = data.city.name;
    infoCityNameDiv.innerHTML = "" + cityName;
    infoAcceptDiv.innerHTML = "";
    infoAcceptDiv.appendChild(infoCityNameDiv);
    for(var weather of data.list){
      console.log(weather);
      var clone = document.importNode(acceptTemplat.content, true);
      console.log(clone);
      clone.querySelector(".dateDiv").textContent = weather.dt_txt;
      clone.querySelector(".temperatureDiv").textContent = getTemp(weather.main.temp);
      infoAcceptDiv.appendChild(clone);
    }
    
    
  } else {
    console.log("was occured error");
    infoErrorDiv.style.display = "block";
    infoAcceptDiv.style.display = "none";
    console.log(data);

  }
}

function updateClick() {
  console.log("request to update");
  update(cityInp.value);
}

function kelvenToCel(t) {
  return t - 273.15;
}
function kelvenToFar(t) {
  var far = (t-273.15)*9/5+32;
  return far;
}
function getTemp(t) {
  if (systemOfTemp.value == 'C') {
    return kelvenToCel(t) + 'C'
  }
  if(systemOfTemp.value == "F"){
    return kelvenToFar(t) + "F"
  }
  else return (t + 'K');
}

updateBut.addEventListener("click", updateClick);


