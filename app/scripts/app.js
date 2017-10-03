'use strict';

/* global angular */

/* eslint camelcase: ["error", {properties: "never"}] */

var myApp = angular.module('myApp', [
  'ngRoute', 'ngDisableScroll', 'd3',
  'angulartics', 'angulartics.google.analytics'
]);

myApp.config(['$locationProvider', '$routeProvider',
             function config($locationProvider, $routeProvider) {
                 $locationProvider.hashPrefix('!');

                 $routeProvider.
                     when('/', {
                     controller: 'mainController',
                     templateUrl: 'views/index.html'
                 }).
                 when('/photography', {
                     controller: 'photographyController',
                     templateUrl: 'views/photography.html'
                 }).
                 when('/about', {
                     controller: 'aboutController',
                     templateUrl: 'views/about.html'
                 }).
                 when('/projects', {
                     controller: 'projectsController',
                     templateUrl: 'views/projects.html'
                 }).
                 otherwise('/');
             }
]);

console.log('------------');
myApp.controller('mainController', function($scope) {
    $scope.isMain = true;
});

myApp.directive('imageOnload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                scope.$apply(attrs.imageOnload);
            });
        }
    };
});

angular.module('d3', [])
  .factory('d3Service', ['$document', '$q', '$rootScope',
    function($document, $q, $rootScope) {
      var d = $q.defer();
      function onScriptLoad() {
        // Load client in the browser
        $rootScope.$apply(function() { d.resolve(window.d3); });
      }
      // Create a script tag with d3 as the source
      // and call our onScriptLoad callback when it
      // has been loaded
      var scriptTag = $document[0].createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.async = true;
      scriptTag.src = 'http://d3js.org/d3.v3.min.js';
      scriptTag.onreadystatechange = function () {
        if (this.readyState === 'complete') {
            onScriptLoad();
        }
      };
      scriptTag.onload = onScriptLoad;

      var s = $document[0].getElementsByTagName('body')[0];
      s.appendChild(scriptTag);

      return {
        d3: function() { return d.promise; }
      };
}]);
