# Accurate-Weather-Dashboard
##Description 
  * This is a website for displaying the current weather details and five day forecast weather details of a particular city.
  * Pseudocode
   1. Declare the Variables.
   2. Create a function that allows user to enter the city name, and the weather is displayed using Open Weather Map API.
   3. Create another function for displaying current weather data includes Date,Temperature,Humidity,Wind speed and UV-Index.
   4. UV-Index change its color based on the conditions.
   5. Display five day forecast includes Date, Temperature, Humidity.
   6. Set the local storage to save the city search history.
   7. Error Handling.

  * The fetch() method is used to request to the server, and the request of OpenWeather API that returns the data of format JSON.
  * The function getUserInput() displays the place name and date in the current weather details section.It calls another function getWeatherData inside it.
  * The function getWeatherData uses two parameters latitude and longitude.And it displays the Temperature, Humidity,Wind-Speed and UV-Index of the city on current day and five day forecast details also. The color coded UV-Index is presented according to the conditions low,moderate,high,very high and extreme.
  * Set the value of current and forecast weather details of the city in local storage.