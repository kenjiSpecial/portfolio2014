'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
        'myApp.controllers',
        'myApp.workControllers',
        'myApp.filters',
        'myApp.directives',
        'myApp.services'
    ]).
    config(function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/works', {
                templateUrl: '/admin/templates/works-view.html',
                controller: 'worksCtrl'
            }).
            when('/work-create', {
                templateUrl : '/admin/templates/work-create.html',
                controller  : 'workCreateCtrl'
            }).
            when('/work-update/:workId', {
                templateUrl : '/admin/templates/work-create.html',
                controller  : 'workUpdateCtrl'
            }).
            when('/experiments', {
                templateUrl : '/admin/templates/experiment-create.html',
                controller  : 'experimentCtrl'
            }).
            otherwise({
                redirectTo: '/experiments'
            });

        $locationProvider.html5Mode(false);

    });
