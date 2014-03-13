'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
        'myApp.controllers',
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
            when('/experiments', {
                templateUrl : '/admin/templates/experiment-create.html',
                controller  : 'experimentCtrl'
            }).
            otherwise({
                redirectTo: '/experiments'
            });

        $locationProvider.html5Mode(false);

    });
