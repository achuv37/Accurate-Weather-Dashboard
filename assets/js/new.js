// Pseudo code
// 1. Declare the variables.
// 2. Create a function to allow user to search for a city and the weather is displayed using Open Weather Map API.
// 3. Create another function for displaying current weather data includes Date,Temperature,Humidity,Wind speed and UV-Index.
// 4. UV-Index change its color based on the conditions.
// 5. Display five day forecast includes Date, Temperature, Humidity.
// 6. Set the local storage to save the city search history.
// 7. Error Handling.

// Declaring Variables.
var cityName = "";
var lat = "";
var lon = "";
// function to allow user to search for a city.
function searchCity () {
  cityName = $("input").val().trim();
// Creating buttons dynamically as the user enters more cities to search.
  var cityList = $("button");
  cityList.addClass("list-group-item list-group-item-action");
  cityList.text(cityName);
// The prepend() method inserts specified content at the beginning of the selected elements.
  $("ul").prepend(cityList);
// After the user's city is saved,clearing the input fields.
  $("input").val("");
}

// Add eventListener to the button element.
$("#city-form").submit(function (event) {
  event.preventDefault();
  searchCity();
});
$("#button-submit").click(function (event) {
  event.preventDefault();
  searchCity(); 
});
$("ul").on("click", "button", function () {
  cityName = $(this).text();
  
 // console.log(cityName);
  currentWeather();
});

// function displays current day weather based on user input.
  function currentWeather() {
// It makes an API call.
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +"&appid=3e40f415c86db2e6bfc1aa88c8631d39";
// make a request to the url
    fetch(apiUrl).then(function(response) {
      response.json().then(function(data) {
      // stores the value of coordinates lat and lon
      lat = data.coord.lat;
      lon = data.coord.lon;
      // Add city name and date.
      $("#city").text(data.name);
      // saves th city name to local storage.
      localStorage.setItem("city", response.name);
    });
  });
  displayWeather(lat,lon);
}

function displayWeather(a,b) {
  var apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?lat=" + a + "&lon=" + b + "&appid=3e40f415c86db2e6bfc1aa88c8631d39";
  fetch(apiUrl1).then(function(response) {
    response.json().then(function(data) {
});
});
}