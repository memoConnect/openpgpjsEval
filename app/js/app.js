'use strict';

var app = angular.module("OpenPGPTest",['ngRoute','Controllers']);

app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when("/generate",{
        templateUrl: "app/tpl/create_keypair.html",
        controller: "GenerateCtrl"
    }).otherwise(
        {redirectTo:"/generate"}
    )
}]);