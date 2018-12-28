angular.module('weatherApp')
// Define service that is called on by the main controller to call the API
// $http allows us to use http to make the call
.service('dataService', function($http) {
    // define getWeather function that makes a request to the openweathermap API
    this.getWeather = function(address, callback) {
      // get request for the data to the url defined in the address argument
      $http.get(address)
      // Callback function to handle data to be defined in the controller
      .then(callback);
    }

});
