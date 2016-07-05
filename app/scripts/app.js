'use strict';

/* global angular */
var myApp = angular.module('myApp', ['ngRoute', 'ngDisableScroll']);

myApp.config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
          $locationProvider.hashPrefix('!');

          $routeProvider.
            when('/', {
              controller: 'mainController',
              templateUrl: 'views/index.html'
            }).
            when('/portfolio', {
              controller: 'portfolioController',
              templateUrl: 'views/portfolio.html'
            }).
            otherwise('/');
        }
]);

myApp.controller('mainController', function($scope) {
    $scope.isMain = true;
});
