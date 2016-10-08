'use strict';
/* global myApp */
/* global angular */

myApp.controller('photographyController', function($scope, $window, $http) {

    $http.get('data/gallery.json').then(function(res){
        $scope.photoSets = res.data;
        console.log($scope.photoSets);
        $scope.loadData(0);
    });

    $scope.loadData = function(setID){
        $scope.data = $scope.photoSets[setID].photos;
        $scope.selectedSet = setID;
    };

    $scope.openningModal = false;

    $scope.zoom = function(zoomIndex){
        $scope.openningModal = true;
        $scope.loading = false;

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
        }else if( e.keyCode === 37 ){
            $scope.$apply( $scope.prev );
        }else if( e.keyCode === 39 ){
            $scope.$apply( $scope.next );
        }
    });

    $scope.updateZoom = function(){
        $scope.loadingZoom = true;
        $scope.zoomObject = $scope.data[$scope.zoomIndex];
    };

    $scope.finishLoading = function(){
        $scope.loadingZoom = false;
    };
});


