
var App = angular.module('comotionApp');

App.directive('topchart', function ($http) {
    return {
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function (scope, element, attrs) {
            
            $http.get('/api/activities/CompanyMonthTotals').success(function (data) {
                render(data);
            }).error(function (data) {
                alert('Failed to get chart data' + data);
            });

            function render(chartdata) {

                var c1 = document.getElementById("myChart");

                var data = {
                    labels: chartdata.days,
                    datasets: [
                        {
                            label: "My First dataset",
                            fillColor: "rgba(215,28,58,0)",
                            strokeColor: "rgba(215,28,58,1)",
                            pointColor: "rgba(215,28,58,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#a12e3f",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: chartdata.steps
                        }
                    ]
                };

                var options = {
                    animation: true,
                    animationEasing: "easeInOutBack",
                    tooltipXPadding: 16,
                    tooltipYPadding: 16,
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: true,
                    showTooltips: true,
                    scaleFontColor: "rgba(255,255,255,.25)",
                    scaleLineColor: "rgba(255,255,255,.25)",
                    scaleOverride: true,
                    scaleSteps: 5,
                    scaleStepWidth: 5000,
                    scaleStartValue: 0,
                    scaleShowGridLines: true,
                    scaleGridLineColor: "rgba(255,255,255,.2)",
                    scaleGridLineWidth: 1,
                    scaleShowHorizontalLines: true,
                    scaleShowVerticalLines: false,
                    bezierCurve: true,
                    bezierCurveTension: 0.4,
                    pointDot: true,
                    pointDotRadius: 6,
                    pointDotStrokeWidth: 2,
                    pointHitDetectionRadius: 20,
                    datasetStroke: true,
                    datasetStrokeWidth: 4,
                    datasetFill: false,
                    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"


                }
                new Chart(c1.getContext("2d")).Line(data, options);
            }
        }
    };
});






