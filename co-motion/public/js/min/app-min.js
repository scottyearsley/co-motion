var comotionApp=angular.module("comotionApp",["ngRoute"]);comotionApp.config(function(o){o.when("/create",{templateUrl:"/templates/create.html",controller:"mainController"}).when("/",{templateUrl:"/templates/home.html",controller:"mainController"})}),comotionApp.controller("mainController",function(o){o.message="Everyone come and see how good I look!"}),comotionApp.controller("mainController",function(o){o.message="Look! I am an about page."}),$(document).foundation();