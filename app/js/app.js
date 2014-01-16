'use strict';

var app = angular.module("App",['ngRoute','Controllers']);

app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when("/generate",{
        templateUrl: "app/tpl/create_keypair.html",
        controller: "GenerateCtrl"
    }).when("/storage",{
        templateUrl: "app/tpl/local_storage.html",
        controller: "StorageCtrl"
    }).otherwise(
        {redirectTo:"/generate"}
    )
}]);