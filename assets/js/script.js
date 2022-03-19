var userFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#city-name");

var getUserInput = function(cityName) {
  // format the github api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=3e40f415c86db2e6bfc1aa88c8631d39";

  // make a request to the url
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      var lan = data.coord.lat;
      var lon = data.coord.lon;
      console.log(lan,lon);
      $("#city").text(data.name);
      $("#date").text(new Date(data.dt*1000));
      localStorage.setItem("city", data.name);
      getWeatherData(lan,lon);
    });
  });
}
function getWeatherData(lan,lon) {
  var apiUrl1 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lan + "&lon="  
      + lon + "&appid=3e40f415c86db2e6bfc1aa88c8631d39";
  fetch(apiUrl1).then(function(response) {
    response.json().then(function(data) {
    console.log(data);
    $("#current-data").css({"display": "block"});
    
    
        
    });
  });

}


var formSubmitHandler = function(event) {
  event.preventDefault();
// get value from input element
var cityName = nameInputEl.value.trim();

if (cityName) {
  getUserInput(cityName);
  var cityList = $("button");
  cityList.addClass("list-group-item list-group-item-action");
  cityList.text(cityName);
  $("ul").prepend(cityList);
  nameInputEl.value = "";
} else {
  alert("Please enter a city name");
}
};
userFormEl.addEventListener("submit", formSubmitHandler); 
