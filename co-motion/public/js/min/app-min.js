    // create the module and name it comotionApp
// also include ngRoute for all our routing needs
var comotionApp = angular.module('comotionApp', ['ngRoute']);

// configure our routes
comotionApp.config(function ($routeProvider) {
    $routeProvider

            // route for the welcome page following authentication
            .when('/welcome', {
            templateUrl : 'templates/welcome.html',
            controller  : 'mainController'
        })
            // route for the home page
            .when('/', {
            templateUrl : '/templates/home.html',
            controller  : 'mainController'
        });

});


comotionApp.controller('mainController', function ($scope, $http, $window) {

    $scope.create = function () {
        var firstname = $scope.firstname;
        var surname = $scope.surname;
        var email = $scope.email;

        if (!firstname || !surname || !email) {
            return;
        }

        // Simple POST request example (passing data) :
        $http.post('/api/users/', { firstname: firstname, surname: surname, email: email }).
          success(function (data, status, headers, config) {
            $window.location.href = "https://api.moves-app.com/oauth/v1/authorize?response_type=code&client_id=xD2Ys2Q73vlB_RAoPFi_YsJRNFSl7Tv_&scope=activity&state=" + data.userId;
        }).
          error(function (data, status, headers, config) {
            alert('Failed to create user...boo! :(   ' + data);
        });
    }

    $http.get('/api/activities/CompanyMonthTotals').success(function (data) {
        $scope.chartData = data;
    }).error(function (data) {
        alert('Failed to get chart data' + data);
    });


});


$(document).foundation();


