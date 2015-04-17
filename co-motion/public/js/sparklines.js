var App = angular.module('comotionApp');

App.directive('sparkline', function() {
    return {
        // Restrict it to be an attribute in this case
        restrict: 'A',
        scope: {
          index: '='  
        },
        // responsible for registering DOM listeners as well as updating the DOM
        link: function(scope, element, attrs) {

            //Get context with jQuery - using jQuery's .get() method.
            var ctx = $(element).get(0).getContext("2d");

            var chartDataArray = [[22, 88, 56, 97, 89, 67, 79, 35, 68, 64, 68, 24, 96, 85, 96, 36, 47, 25, 58, 37, 74, 74, 85, 36, 25, 36, 74, 85, 74, 96],
                                  [28, 48, 40, 19, 96, 27, 100, 36, 46, 75, 25, 77, 44, 73, 92, 35, 64, 23, 46, 57, 86, 33, 56, 86, 34, 57, 56, 34, 87, 88],
                                  [94, 47, 96, 58, 47, 63, 47, 52, 85, 74, 58, 63, 85, 63, 74, 58, 25, 58, 69, 74, 85, 74, 63, 58, 69, 63, 58, 47, 58, 69, 47],
                                  [75, 86, 47, 85, 96, 96, 85, 96, 58, 96, 75, 3, 75, 69, 57, 6, 96, 47, 68, 97, 68, 75, 79, 67, 75, 86, 97, 67, 79, 86],
                                  [65, 68, 45, 86, 5, 85, 67, 67, 97, 86, 75, 68, 57, 86, 97, 57, 86, 35, 75, 86, 97, 68, 57, 86, 57, 68, 97, 68, 57, 86]];

            var chartData = chartDataArray[scope.index];

            //This will get the first returned node in the jQuery collection.
            //var myNewChart = new Chart(ctx);

            // Build the data object
            var data = {};
            var labels = [];
            var datasets = {};

            // Create a null label for each value
            for (var i = 0; i < chartData.length; i++) {
                labels.push('');
            }

            // Create the dataset
            datasets['strokeColor'] = "rgba(255,255,255,1)";
            datasets['data'] = chartData;

            // Add to data object
            data['labels'] = labels;
            data['datasets'] = Array(datasets);

            var sparklineStyle = {
                scaleLineColor: "rgba(0,0,0,0)",
                scaleShowLabels: false,
                scaleShowGridLines: false,
                pointDot: false,
                datasetFill: false,
                //strokeColor: "rgba(255, 255, 255,1)",
                //showTooltips: false,
                // Sadly if you set scaleFontSize to 0, chartjs crashes
                // Instead we'll set it as small as possible and make it transparent
                scaleFontSize: 1,
                scaleFontColor: "rgb(0,0,0)"
            }
            new Chart(ctx).Line(data, sparklineStyle);
        }
    }
});
