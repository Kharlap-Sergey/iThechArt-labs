//import {citiesList} from "./cities-id.js";
// var end = false;
// var citySelector = document.getElementById("cityCelector");
// var promise = jQuery.getJSON("./city.list.json")
//     .done(function(data){
//       citiesInfo = data;
//       for(var elem of data){
//         var newOpt = new Option(elem["name"], elem["id"]);
//         citySelector.append(newOpt);
//       }
//       console.log("was appended");
//     });

var citiesInfo;
var apiKey = "a3cee816cfe1cbe02e83c52285a3a8e8";
var cityName = "Minsk";

var url =
  "https://api.openweathermap.org/data/2.5/forecast?q=" +
  cityName +
  "&appid=" +
  apiKey;
console.log(url);

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
