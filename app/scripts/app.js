'use strict';

/* global angular */
/* global _ */
/* global querystring */

/* eslint camelcase: ["error", {properties: "never"}] */

var myApp = angular.module('myApp', ['ngRoute', 'ngDisableScroll']);

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
                 otherwise('/');
             }
]);

myApp.controller('mainController', function($scope) {
    $scope.isMain = true;
});

myApp.factory('$flickr', function($http) {
    var API_ENDPOINT = 'https://api.flickr.com/services/rest/';
    var defaultParams = {
        api_key: '93f5faaf8c085c222449e0f62cf97734',
        user_id: '132196854@N06'
    };

    var flickr = {
        getPhotosFromSet: function( setID, callback ){
            var params = {
                method: 'flickr.photosets.getPhotos',
                per_page: 500,
                photoset_id: setID,
                extras: 'url_s,url_m,url_o',
                format: 'json',
                nojsoncallback: 1
            };

            params = _.merge( params, defaultParams );
            var url = this.generateRequest(params );

            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                callback(response.data.photoset.photo);
            });

        },
        generateRequest: function(params){
            return API_ENDPOINT + '?' + querystring.stringify(params);
        }
    };
    return flickr;
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
