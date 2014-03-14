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


AppWorkController.controller('workCreateCtrl', ['$scope', '$http', function($scope, $http){
    var activeClass = angular.element(document.querySelector('.active'));
    activeClass.removeClass('active');

    var navSelectedClass = angular.element(document.querySelector('#admin-works'));
    navSelectedClass.addClass('active');

    
}]);