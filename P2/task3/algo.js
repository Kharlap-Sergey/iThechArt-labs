var apiKey = "a3cee816cfe1cbe02e83c52285a3a8e8";
var cityName = "";
var url =
  "https://api.openweathermap.org/data/2.5/forecast?q=" +
  cityName +
  "&appid=" +
  apiKey;


var info = document.getElementById("info");
var cityInp = document.getElementById("cityInp");
var updateBut = document.getElementById("updateBut");
console.log(updateBut);
updateBut.addEventListener("click", () =>{
  console.log("fdsa");
  console.log(cityInp.value)
});
console.log(cityInp);
console.log(info);
console.log(url);

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
