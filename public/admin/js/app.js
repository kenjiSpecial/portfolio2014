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
            when('/works', {
                templateUrl: '/admin/templates/works-view.html',
                controller: 'worksCtrl'
            }).
            when('/works-create', {
                templateUrl: '/admin/templates/works-create.html',
                controller: 'workCreateCtrl'
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
