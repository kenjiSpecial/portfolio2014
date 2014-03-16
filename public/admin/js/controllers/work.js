'use strict';

var AppWorkController = angular.module('myApp.workControllers', []);

/**
 *  workCtrl
 */

AppWorkController.controller('worksCtrl', [ '$scope', '$http', 'Works', function($scope, $http, Works){
    var activeClass = angular.element(document.querySelector('.active'));
    activeClass.removeClass('active');

    var navSelectedClass = angular.element(document.querySelector('#admin-works'));
    navSelectedClass.addClass('active');

    $scope.works = Works.query();

}]);


AppWorkController.controller('workCreateCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
    // initialize the value
    $scope.agency = {};
    $scope.client = {};

    var activeClass = angular.element(document.querySelector('.active'));
   activeClass.removeClass('active');

    var navSelectedClass = angular.element(document.querySelector('#admin-works'));
    navSelectedClass.addClass('active');

    $scope.years = [ 2010, 2011, 2012, 2013, 2014 ];
    $scope.year = $scope.years[0];

    $scope.types = ['client work', 'personal project'];
    $scope.type = $scope.types[0];

    $scope.mediums = ['site', 'app'];
    $scope.medium = $scope.mediums[0];

    $scope.technologies = [{label: 'JavasScript', type: false}, {label: 'C++', type: false}, {label: 'Objective C', type: false}];
    $scope.technologyToggle = function () {
        this.technology.type = !this.technology.type;
    };

    $scope.workCreate = function(){
        var i;
        var isFill = true;
        var check = function(val){
            if(!val){
                isFill = false;
                return null;
            }else{
                return val;
            }
        };

        var title  = check($scope.title);
        var url    = check($scope.url);
        var year   = $scope.year;
        var type   = $scope.type;
        var medium = $scope.medium;
        var technologies = [];
        var client = $scope.client;
        var agency = $scope.agency;
        var description = check($scope.description);

        // ------------------------------------

        $scope.isAlert = true;

        if(!title) $scope.isTitleError = true;
        else       $scope.isTitleError = false;

        if(!url) $scope.isUrlError = true;
        else     $scope.isUrlError = false;

        if(!medium) $scope.isMediumError = true;
        else        $scope.isMediumError = false;

        if(!description) $scope.isDescriptionError = true;
        else             $scope.isDescriptionError = false;


        for( i = 0; i < $scope.technologies.length; i++ ){
            var technology = $scope.technologies[i];

            if(technology.type) technologies.push(technology.label);
        }

        if(!isFill){
            $scope.isAlert = true;
            return;
        }else
            $scope.isAlert = false;


        var data = {
            title: title,
            url  : url,
            year : year,
            type : type,
            medium : medium,
            technologies : technologies,
            client : client,
            agency : agency,
            description : description
        };

        $http({method: 'POST', url: '/admin/create-work', data: data})
            .success(function(data, status){
                $location.url('/works');
                console.log('success');
            })
            .error(function(data, status){

        });

    }


}]);