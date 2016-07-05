'use strict';
/* global myApp */
/* global angular */
/* global data */

myApp.controller('portfolioController', function($scope, $window) {
    $scope.openningModal = false;

    $scope.zoom = function(zoomIndex){
        $scope.openningModal = true;

        $scope.zoomIndex = zoomIndex;

        $scope.updateZoom();
    };

    $scope.next = function($event){
        if( $scope.zoomIndex < $scope.data.length - 1 ) {
            $scope.zoomIndex = $scope.zoomIndex + 1;
            $scope.updateZoom();
            if( $event && $event.stopPropagation ){
                $event.stopPropagation();
            }
        }
    };

    $scope.prev = function($event){
        if( $scope.zoomIndex > 0 ) {
            $scope.zoomIndex = $scope.zoomIndex - 1;
            $scope.updateZoom();
            if( $event && $event.stopPropagation ){
                $event.stopPropagation();
            }
        }
    };

    $scope.close = function(){
        $scope.openningModal = false;
    };


    angular.element($window).on('keyup', function(e) {
        if( !$scope.openningModal ) {
             return;
        }
        if( e.keyCode === 27 ){
            $scope.$apply( $scope.close );
        }else if( e.keyCode === 74 ){
            $scope.$apply( $scope.prev );
        }else if( e.keyCode === 75 ){
            $scope.$apply( $scope.next );
        }
    });

    $scope.updateZoom = function(){
        $scope.zoomURL = $scope.data[$scope.zoomIndex];
    };

    $scope.data = data;
});


