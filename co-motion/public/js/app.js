    // create the module and name it comotionApp
    // also include ngRoute for all our routing needs
    var comotionApp = angular.module('comotionApp', ['ngRoute']);

    // configure our routes
    comotionApp.config(function($routeProvider) {
        $routeProvider

             // route for the about page
            .when('/create', {
                templateUrl : '/views/create.html',
                controller  : 'mainController'
            })

            // route for the home page
            .when('/', {
                templateUrl : '/views/home.html',
                controller  : 'mainController'
            });

    });

    // create the controller and inject Angular's $scope
    comotionApp.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    comotionApp.controller('mainController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });



    $(document).foundation();
