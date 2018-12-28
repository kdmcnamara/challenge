describe('Data API', function() {
    var scope, createController;
    beforeEach(angular.mock.module('weatherApp'));

    // Dependency injection to allow unit tests to connect to AngularJS
    beforeEach(inject(function ($rootScope, $controller) {

        scope = $rootScope.$new();

        createController = function() {
            return $controller('mainCtrl', {
                '$scope': scope
            });
        };
    }));

    // A simple test to verify the fahrenheit function works correctly
    it('should be converted to fahrenheit', function() {
      var controller = createController();
      var k = scope.toFahrenheit(273.15);

      expect(k).toBeCloseTo(32);
    });

    it('should return readable time', function() {
      var controller = createController();
      var time = scope.timeZone("1/30/18 15:00:00");

      expect(time).toEqual("3:00 pm");
    });

    it('should return capitalized string', function() {
      var controller = createController();
      var str = scope.capitalizeDescription("a string");

      expect(str).toEqual("A string");
    });

});
