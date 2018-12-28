angular.module('weatherApp') // No new module
.controller('mainCtrl', function($scope, dataService) {

  // getWeather makes a request to the API for weather data and stores the data in variables made available in the view
  $scope.getWeather = function() {
    // Use the getWeather service defined in dataService to make the API call
    dataService.getWeather($scope.address, function(response) {
      // Store data from response in a JavaScript variable
      var data = response.data;
      $scope.currentWeather = data;
      // toFahrenheit converts the temperature from kelvin, which the API returns it in, to to fahrenheit
      $scope.currentWeather.main.temp = $scope.toFahrenheit($scope.currentWeather.main.temp);
      // capitalizeDescription capitalizes the first letter of the description
      var desc = $scope.capitalizeDescription($scope.currentWeather.weather[0].description);
      // Array of data valueus for the view
      $scope.weathers = [{"Temp": $scope.currentWeather.main.temp, "Description": desc}]
      return data
    });
	}

  // getUpcomingWeather makes a request to the API for upcoming weather data and stores the data in variables made available in the view
  $scope.getUpcomingWeather = function() {
    // Use the getWeather service defined in dataService to make the API call
    dataService.getWeather($scope.upcomingAddress, function(response) {
      // scope variable upcomingTimes stores times that the weather is measured
      $scope.upcomingTimes = [];
      // Store response in variable
      var data = response.data;
      // Make data available to the scope through $scope.upcomingWeather
      $scope.upcomingWeather = data;
      // use toFahrenheit to convert the temperature in the response and save it to a scope variable
      $scope.upcomingTemp = $scope.toFahrenheit(data.list[0].main.temp);
      // Use capitalizeDescription to capitalize the first letter of the description from the response and store it in $scope.upcomingDescription
      $scope.upcomingDescription = $scope.capitalizeDescription(data.list[0].weather[0].description);
      // Find the weather data for the next 5 periods of measurement
      for(var i = 0; i < 5; i++) {
        // timeZone converts the time periods in the response to a readable format
        var time = $scope.timeZone(data.list[i].dt_txt);
        // push the converted time period to $scope.upcomingTimes at every iteration
        $scope.upcomingTimes.push(time);
      }
      return data
    });
  }

  // toFahrenheit converts the temperature value in the input x from Kelvin to fahrenheit
  $scope.toFahrenheit = function(x) {
    k = ((9/5) * (x - 273.15) + 32).toPrecision(4);
    return k;
  }

  // capitalizeDescription capitalizes the first letter of the input string and returns the capitalized string
  $scope.capitalizeDescription = function(str) {
     return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // timeZone takes a string of time and converts it from 24 hour time system to US time
  $scope.timeZone = function(time) {
    var zero = "00:00:00";
    var three = "03:00:00";
    var six = "06:00:00";
    var nine = "9:00:00";
    var twelve = "12:00:00";
    var fifteen = "15:00:00";
    var eighteen = "18:00:00";
    var twentyOne = "21:00:00";
    var twentyFour = "24:00:00";

    // if the time in the input contains "00:00:00", change it to 12:00 pm
    if(time.includes(zero)) {
      time = "12:00 pm"
    }
    if(time.includes(three)) {
      time = "3:00 am"
    }
    if(time.includes(six)) {
      time = "6:00 am"
    }
    if(time.includes(nine)) {
      time = "9:00 am"
    }
    if(time.includes(twelve)) {
      time = "12:00 pm"
    }
    if(time.includes(fifteen)) {
      time = "3:00 pm"
    }
    if(time.includes(eighteen)) {
      time = "6:00 pm"
    }
    if(time.includes(twentyOne)) {
      time = "9:00 pm"
    }
    if(time.includes(twentyFour)) {
      time = "12:00 am"
    }
    // Return converted time value
    return time
  }


});
