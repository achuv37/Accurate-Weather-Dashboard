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