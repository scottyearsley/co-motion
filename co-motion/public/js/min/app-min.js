    // create the module and name it comotionApp
    // also include ngRoute for all our routing needs
    var comotionApp = angular.module('comotionApp', ['ngRoute']);

    // configure our routes
    comotionApp.config(function($routeProvider) {
        $routeProvider

             // route for the about page
            .when('/create', {
                templateUrl : 'templates/create.html',
                controller  : 'mainController'
            })

            // route for the welcome page following authentication
            .when('/welcome', {
                templateUrl : 'templates/welcome.html',
                controller  : 'mainController'
            })

            // route for the home page
            .when('/', {
                templateUrl : 'templates/home.html',
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


    // Workarea Height
    $(document).ready(function() {

        function setHeight() {
            var windowHeight = $(window).innerHeight();

            $('.sidebar').css('height', windowHeight);
            $('.maincontent').css('height', windowHeight);

        };

        setHeight();

        $(window).resize(function() {
            setHeight();
        });

    });



    $(document).foundation();


