// Pseudo code
// 1. Declare the Variables.
// 2. Create a function that allows user to enter the city name, and the weather is displayed using Open Weather Map API.
// 3. Create another function for displaying current weather data includes Date,Temperature,Humidity,Wind speed and UV-Index.
// 4. UV-Index change its color based on the conditions.
// 5. Display five day forecast includes Date, Temperature, Humidity.
// 6. Set the local storage to save the city search history.
// 7. Error Handling.

// Declaring the variables.
var userFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#city-name");
var lat;
var lon;


// function for getting user input
var getUserInput = function (cityName) {
  // format the weather api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=3e40f415c86db2e6bfc1aa88c8631d39";

  // make a request to the url
  fetch(apiUrl).then(function (response) {
    return response.json()
  }).then(function (data) {
    /*console.log('hit')
    if (data.cod !== 200) {
      throw new Error
    };
    console.log('hit') */
    // Assigning the values to the variables   
    lon = data.coord.lon;
    lat = data.coord.lat;
    console.log(lon, lat);
    // Html element display the city and date 
    $("#city").text(data.name);
    var dateFormat = new Date(data.dt * 1000);
    $("#date").text(dateFormat.toDateString());
    // Set the city name to local storage
    localStorage.setItem("city", data.name);
    // Calling the function to display more details
    getWeatherData(lat, lon);

  }).catch(function (error) {
    console.log('getUserInput error')
    console.error(error);
    alert('Please enter a valid city name');
  });
}

// function getWeatherData
function getWeatherData(lat, lon) {
  // format weather api url
  var apiUrl1 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" +
    lon + "&appid=3e40f415c86db2e6bfc1aa88c8631d39";
  // Make a request to the url
  fetch(apiUrl1).then(function (response) {
    response.json().then(function (data) {
      
      // clearing five day forecast before next one.
      $(".card-deck").empty();
      
      // Weather icon from data
      var icon = data.current.weather[0].icon;
      var displayImg = $("<img>");
      displayImg.attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
      displayImg.css({
        "width": "10%"
      });
      $("#city").append(displayImg);
      //Temperature from data. converting K to F
      var temp = data.current.temp;
      var tempF = parseInt(((temp - 273.15) * 9 / 5) + 32);
      $("#temperature").text("Temperature: " + tempF + "°F");
      // Humidity
      var humid = data.current.humidity;
      $("#humidity").text("Humidity: " + humid + "%");
      // Wind-speed
      var wind = data.current.wind_speed;
      $("#wind").text("Wind-Speed: " + wind + "MPH");
      // Color-coded Uv-Index.
      var uviIndex = parseInt(data.current.uvi);
      // Checking the conditions:(low,medium,high,very-high and extreme)
      if (uviIndex <= 2) {
        $(".color-code").css({
          "background-color": "green",
          "color": "black"
        });
      } else if (uviIndex >= 3 && uviIndex <= 5) {
        $(".color-code").css({
          "background-color": "yellow",
          "color": "black"
        });
      } else if (uviIndex <= 6 && uviIndex >= 7) {
        $(".color-code").css({
          "background-color": "orange",
          "color": "black"
        });
      } else if (uviIndex <= 8 && uviIndex >= 10) {
        $(".color-code").css({
          "background-color": "red",
          "color": "black"
        });;
      } else if (uviIndex >= 11) {
        $(".color-code").css({
          "background-color": "purple",
          "color": "black"
        });
      }
      $(".color-code").text(data.current.uvi);
      // Display the current weather data
      $("#current-data").css({
        "display": "block"
      });

      // We need to display 5 day forecast.,using for  loop to iterate through the DailyData.
      var dailyData = data.daily;
      console.log(dailyData);
      for (var i = 1; i < dailyData.length - 2; i++) {
        // date format
        var dateFormatEl = new Date(dailyData[i].dt * 1000);
        var displayDate = dateFormatEl.toDateString();
        var tempData = dailyData[i].temp.day;
        var displayTemp = parseInt(((tempData - 273.15) * 9 / 5) + 32);
        var displayHumid = dailyData[i].humidity;
        var displayIcon = dailyData[i].weather[0].icon;
        var displayWind = dailyData[i].wind_speed;
        //var displayUvi = dailyData[i].uvi;


        // Creating card elements dynamically.
        var forecastCards = $("<div class='card text-light bg-info p-3'>");
        var dateEl = $("<h6>");
        var imgIcon = $("<img>");
        var tempEl = $("<p>");
        var humidEl = $("<p>");
        var windEl = $("<p>");
        //var uviEl = $("<p>");
        // Adding content to the dynamically created elements.
        dateEl.text(displayDate);
        imgIcon.attr("src", "http://openweathermap.org/img/wn/" + displayIcon + "@2x.png");

        tempEl.text("Temp : " + displayTemp + "°F");
        humidEl.text("Humidity : " + displayHumid + "%");
        windEl.text("Wind : " + displayWind + "MPH");
        //uviEl.text("UVI-Index : " + displayUvi);
        // Append to the div element.
        forecastCards.append(dateEl);
        forecastCards.append(imgIcon);
        forecastCards.append(tempEl);
        forecastCards.append(humidEl);
        forecastCards.append(windEl);
        // forecastCards.append(uviEl);
        $(".card-deck").append(forecastCards);
        // Display five day forecast.
        $("#forecast").css({
          "display": "block"
        });
      }
    });
  }).catch(function (error) {
    console.log('getWeatherData error')
    console.error(error);

  });

}
// function formSubmitHandler
var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element

  var cityName = nameInputEl.value.trim();

  if (cityName) {
    getUserInput(cityName);
    var cityList = $("<li>");
    cityList.addClass("list-group-item list-group-item-action");
    cityList.text(cityName);
    $("ul").prepend(cityList);
    nameInputEl.value = "";
  } else {
    alert("Please enter a city name");
  }
  //getUserInput();
}

// Function for local storage.
function localStorageList() {
  var cityHistory = localStorage.getItem("city");
  if (cityHistory !== null) {

    var cityName = $("<li>");
    cityName.text(cityHistory);
    cityName.addClass("list-group-item list-group-item-action");
    $("ul").prepend(cityName);
    getUserInput(cityHistory);
  }
}
  localStorageList(); 

// Add eventListener 
userFormEl.addEventListener("submit", formSubmitHandler);
//$("#city-form").submit(formSubmitHandler);

$("#button-submit").click(formSubmitHandler);

$("ul").on("click", "li", function () {
  var cityName = $(this).text();

  console.log(cityName);
  getUserInput(cityName);
});



