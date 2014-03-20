'use strict';

var aboutController = angular.module('myApp.aboutControllers', []);

/**
 *  aboutCtrl
 */

aboutController.controller('aboutCtrl', ['$scope', '$http', function ($scope, $http) {
    var activeClass = angular.element(document.querySelector('.active'));
    activeClass.removeClass('active');

    var navSelectedClass = angular.element(document.querySelector('#admin-about'));
    navSelectedClass.addClass('active');


}]);
