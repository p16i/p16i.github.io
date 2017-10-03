'use strict';
/* global myApp */
/* global yaml */
/* global _ */

myApp.controller('projectsController', function($scope, $http) {
    $scope.availableTags = [];

    $http.get('data/projects.yaml').then(function(res){
        $scope.projects = _.map(yaml.load(res.data), function(p){
            if(p.desc.length > 200) {
                p.desc = p.desc.slice(0, 295) + '[..]';
            }
            return p;
        });

        $scope.filteredProjects = $scope.projects;

        /* build availableTags */
        var tags = [];
        _.forEach($scope.projects, function(p){
            console.log(p);
            tags = tags.concat(p.tags);
        });

        tags = _.uniq(tags);
        tags.sort();

        $scope.availableTags = _.map(tags, function(t){
            return {
                name: t,
                isSelected: false
            };
        });
    });

    $scope.selectTag = function(index) {
        var curValue = $scope.availableTags[index].isSelected;
        $scope.availableTags[index].isSelected = !curValue;

        var selectedTags = _.filter($scope.availableTags, function(t){
            return t.isSelected;
        }).map(function(t){
            return t.name;
        });

        if(selectedTags.length > 0){
            $scope.filteredProjects = _.filter($scope.projects, function(p){
                return _.intersection(p.tags, selectedTags).length > 0;
            });
        } else {
            $scope.filteredProjects = $scope.projects;
        }
    };

    $scope.clearSelection = function(){
        _.forEach($scope.availableTags, function(t){
            t.isSelected = false;
        });
        $scope.filteredProjects = $scope.projects;
    };
});
