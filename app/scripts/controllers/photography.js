'use strict';
/* global myApp */
/* global angular */

myApp.controller('photographyController', function($scope, $window, $flickr) {

    $scope.photoSets = [
        {
            name: 'Lifestyle',
            id: '72157671543489895'
        },
        {
            name: 'Abstract',
            id: '72157671453437906'
        },
        {
            name: 'Places',
            id: '72157670749338322'
        },
        {
            name: 'Music & Festival',
            id: '72157670784624421'
        }
    ];

    $scope.loadData = function(setID){
        $flickr.getPhotosFromSet( setID, function(photos){
            $scope.data = photos;
            $scope.selectedSet = setID;
        });
    };

    $scope.loadData($scope.photoSets[0].id);

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
        }else if( e.keyCode === 74 ){
            $scope.$apply( $scope.prev );
        }else if( e.keyCode === 75 ){
            $scope.$apply( $scope.next );
        }
    });

    $scope.updateZoom = function(){
        $scope.loadingZoom = true;
        $scope.zoomURL = $scope.data[$scope.zoomIndex].url_o;
        $scope.zoomTitle = $scope.data[$scope.zoomIndex].title;
    };

    $scope.finishLoading = function(){
        $scope.loadingZoom = false;
    };
});


