'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
        'myApp.controllers',
        'myApp.filters',
        'myApp.services',
        'myApp.directives'
    ]).
    config(function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/view1', {
                templateUrl: '/admin/partials/partial1.html',
                controller: 'MyCtrl1'
            }).
            when('/view2', {
                templateUrl: '/admin/partials/partial2.html',
                controller: 'MyCtrl2'
            }).
            otherwise({
                redirectTo: '/view1'
            });
        $locationProvider.html5Mode(false);
        //$locationProvider.hashPrefix('!');
        //$locationProvider.hashPrefix(true);
//  $locationProvider.html5Mode(true);
    });
