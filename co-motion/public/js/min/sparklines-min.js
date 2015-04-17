var App = angular.module('comotionApp');

App.directive('sparkline', function() {
    return {
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function(scope, element, attrs) {
            var c1 = document.getElementById("sparkLine");

            $(document).ready(function() {
  $('.sparkline').each(function() {
    //Get context with jQuery - using jQuery's .get() method.
    var ctx = $(this).get(0).getContext("2d");
    //This will get the first returned node in the jQuery collection.
    var myNewChart = new Chart(ctx);

    // Get the chart data and convert it to an array
    var chartData = JSON.parse($(this).attr('data-chart_values'));

    // Build the data object
    var data = {};
    var labels = [];
    var datasets = {};

    // Create a null label for each value
    for (var i = 0; i < chartData.length; i++) {
      labels.push('');
    }

    // Create the dataset
    datasets['strokeColor'] = $(this).attr('data-chart_StrokeColor');
    datasets['data'] = chartData;

    // Add to data object
    data['labels'] = labels;
    data['datasets'] = Array(datasets);

    new Chart(ctx).Line(data, sparklineStyle);
  })
});

var data = {
	labels : ["January","February","March","April","May","June","July"],
	datasets : [
		{
			strokeColor : "rgba(151,187,205,1)",
			data : [28,48,40,19,96,27,100]
		}
	]
}

//console.log(data);

var sparklineStyle = {
  scaleLineColor : "rgba(0,0,0,0)",
  scaleShowLabels : false,
  scaleShowGridLines : false,
  pointDot : false,
  datasetFill : false,
  // Sadly if you set scaleFontSize to 0, chartjs crashes
  // Instead we'll set it as small as possible and make it transparent
  scaleFontSize : 1,
  scaleFontColor : "rgba(0,0,0,0)",
}





