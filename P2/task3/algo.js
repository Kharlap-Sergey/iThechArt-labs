var info = document.getElementById("info");
var systemOfTemp = document.getElementById("systemOftemp");
var cityInp = document.getElementById("cityInp");
var updateBut = document.getElementById("updateBut");
var infoErrorDiv = document.getElementById("errorDiv");
var infoAcceptDiv = document.getElementById("acceptDiv");
var infoCityNameDiv = document.getElementById("cityNameDiv");
var infoDateDiv = document.getElementById("dateDiv");
var infoWeatherBody = document.getElementById("weather-body");
var langOpt = document.getElementById("lang");

dateFormater = {
  getDateStirngFromDate: function(date) {
    var regex = arguments[1];
    if(regex == null){
      regex = "MM/DD/YYYY";
    }
    console.log("regex for outputing " + regex);
    var result = "";
    var mf = false,
      df = false,
      yf = false;
    for (var i = 0; i < regex.length; i++) {
      switch (regex[i]) {
        case "M":
          if (mf) {
            break;
          }
          result += date.getMonth();
          mf = true;
          break;
        case "D":
          if (df) {
            break;
          }
          result += date.getDate();
          df = true;
          break;
        case "Y":
          if (yf) {
            break;
          }
          console.log("year " + date.getFullYear());
          result += date.getFullYear();
          yf = true;
          break;
        default:
          result += regex[i];
      }
    }
    return result;
  },

  getDateFromeString: function (str) {
    var regex = arguments[1];
    if(regex == null){
      regex = "MMDDYYYY"
    }
    console.log("string for format " + str);
    console.log("regex = " + regex);
    var month = 0,
      day = 0,
      year = 0;

    for (var i = 0; i < regex.length; i++) {
      switch (regex[i]) {
        case "M":
          console.log(str[i]);
          month = month * 10 + +str[i];
          break;
        case "D":
          console.log(str[i]);
          day = day * 10 + +str[i];
          break;
        case "Y":
          year = year * 10 + +str[i];
          break;
      }
    }
    console.log(year, day, month);
    return (dateTime = new Date(year, month, day));
  },

  getDateFromeMs: function (ms) {
    return new Date(ms);
  },
};

function parseDate(str) {
  return dateFormater.getDateFromeString(str, "YYYY-MM-DD");
}
function getTime(str) {
  return str.substring(10, 16);
}

function getUrl(cityName, lang){
  var apiKey = "a3cee816cfe1cbe02e83c52285a3a8e8";
  var url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&lang=" +
    lang + 
    "&appid=" +
    apiKey;

  return url;
}

function update(cityName, lang) {
  console.log("was called update function");
  console.log(cityInp.value);

  var url = getUrl(cityName, lang);
  console.log("url: " + url);

  var requester = new XMLHttpRequest();
  requester.open("GET", url);
  requester.onload = function(){
    console.log("request was exequted");
    var jsonResponse = JSON.parse(requester.response)
    console.log(jsonResponse);
    showData(jsonResponse);

  }
  requester.send(null);
  // fetch(url)
  //   .then( function (response){
  //     return response.json();
  //   })
  //   .then(function(data){
  //     showData(data);
  //   });
}


function showDataForSucsess(data) {
  infoErrorDiv.style.display = "none";
  infoAcceptDiv.style.display = "block";
  var acceptTemplat = document.getElementById("acceptDiv-temp");

  console.log("acceptTemplate:");
  console.log(acceptTemplat);


  infoCityNameDiv.innerHTML = "" + data.city.name;
  infoDateDiv.innerHTML = "today";

  infoWeatherBody.innerHTML = "";
  console.log(infoWeatherBody);
  //infoAcceptDiv.appendChild(infoCityNameDiv);
  for (var i = 0; i < data.list.length; i++) {
    var weather = data.list[i];
    //get date object from string
    var date = parseDate(weather.dt_txt);
    var today = new Date(Date.now());

    console.log("today ", today.getDate());
    if (date.getDate() != today.getDate()) {
      break;
    }
    console.log("template:");
    console.log(acceptTemplat);
    console.log("date:");
    console.log(date);
    console.log("weather");
    console.log(weather);
    //var clone = document.importNode(acceptTemplat, true);
    var clone = acceptTemplat.querySelector(".accept-element").cloneNode(true);
    console.log(clone);

    //insert date and current tempr
    clone
      .querySelector(".accept-element__dateDiv")
      .textContent = getTime(weather.dt_txt);
    clone
      .querySelector(".accept-element__weather")
      .textContent = weather.weather[0].main;
    clone
      .querySelector(".accept-element__temperatureDiv")
      .textContent = getTemp(weather.main.temp);
    clone
      .querySelector(".accept-element__temperatureDiv").
      style.marginTop = "" + (50 - (+weather.main.temp - 280)) + "px";
    console.log("temp" + (+weather.main.temp) / 100);
    //add cloned element to the page
    infoWeatherBody.appendChild(clone);
  }
}
function showData(data) {
  if (data.cod.match(/2/)) {
    showDataForSucsess(data);
  } else {
    console.log("was occured error");
    infoErrorDiv.style.display = "block";
    infoAcceptDiv.style.display = "none";
    console.log(data);

  }
}

function updateClick() {
  console.log("request to update");
  update(cityInp.value, langOpt.value);
}

function kelvenToCel(t) {
  return (t - 273.15).toFixed(1);
}
function kelvenToFar(t) {
  var far = (t - 273.15) * 9 / 5 + 32;
  return far.toFixed(1);
}
function getTemp(t) {
  if (systemOfTemp.value == 'C') {
    return kelvenToCel(t) + 'C'
  }
  if (systemOfTemp.value == "F") {
    return kelvenToFar(t) + "F"
  }
  else return (t.toFixed(1) + 'K');
}

updateBut.addEventListener("click", updateClick);


