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
      //localStorage.setItem("city", data.name);
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
    var icon = data.current.weather[0].icon;
    var displayImg = $("<img>");
    displayImg.attr("src","http://openweathermap.org/img/wn/" + icon + "@2x.png");
    displayImg.css({"width": "10%"});
    $("#city").append(displayImg);
    var temp = data.current.temp;
    var tempF = parseInt((( temp - 273.15) * 9/5) + 32);
    $("#temperature").text("Temperature: " + tempF + "F");
    var humid = data.current.humidity;
    $("#humidity").text("Humidity: " + humid + "%");
    var wind = data.current.wind_speed;
    $("#wind").text("Wind-Speed: " + wind + "MPH");
  // Color-coded Uv-Index.
    var uviIndex = parseInt(data.current.uvi);
  // Checking the conditions.
    if(uviIndex <=2) {
      $(".color-code").css({"background-color": "green", "color": "black"});
  } else if(uviIndex >= 3 && uviIndex <= 5) {
      $(".color-code").css({"background-color": "yellow", "color": "black"});
  } else if(uviIndex <=6 && uviIndex >=7) {
      $(".color-code").css({"background-color": "orange", "color": "black"});
  } else if(uviIndex <=8 && uviIndex >=10) {
      $(".color-code").css({"background-color": "red", "color": "black"});;
  } else if(uviIndex >= 11) {
      $(".color-code").css({"background-color": "purple", "color": "black"});
  } 
    $(".color-code").text(data.current.uvi);
    $("#current-data").css({"display": "block"});
 
    // We need to display 5 day forecast.,using for  loop to iterate through the data.
    var dailyData = data.daily;
    console.log(dailyData);  
    for(var i = 1; i <dailyData.length - 2; i++) {
      var displayDate = new Date(dailyData[i].dt*1000);
      var tempData = dailyData[i].temp.day;
      var displayTemp = parseInt((( tempData - 273.15) * 9/5) + 32);
      var displayHumid = dailyData[i].humidity;
      var displayIcon = dailyData[i].weather[0].icon;
      
    // Creating card elements dynamically.
      var forecastCards = $("<div class='card text-light bg-primary p-3'>");
      var dateEl = $("<h6>");
      var imgIcon = $("<img>");
      var tempEl = $("<p>");
      var humidEl = $("<p>");
    // Adding content to the dynamically created elements.
      dateEl.text(displayDate);
      imgIcon.attr("src", "http://openweathermap.org/img/wn/" + displayIcon + "@2x.png");
      
      tempEl.text("Temp: " + displayTemp + "F");
      humidEl.text("Humidity: " + displayHumid + "%");
    // Append to the div element.
      forecastCards.append(dateEl);
      forecastCards.append(imgIcon);
      forecastCards.append(tempEl);
      forecastCards.append(humidEl);
      $(".card-deck").append(forecastCards);
    // Display five day forecast.
      $("#forecast").css({"display": "block"});
    }
    })
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
