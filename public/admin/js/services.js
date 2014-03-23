'use strict';

/* Services */


var myAppServices = angular.module('myApp.services', ['ngResource']);

/**
 *  'Experiments'
 */

myAppServices.factory('Experiments', ['$resource', function($resource){
    return $resource('/admin/experiment', {}, {
        query: {method:'GET', isArray:true}
    });
}]);

/**
 *  'Work'
 */

myAppServices.factory('Works', ['$resource', function($resource){

    return $resource('/admin/works', {}, {
        query: { method:'GET', isArray:true }
    });


}]);

myAppServices.factory('Work', ['$resource', function($resource){
    return $resource('/admin/work/:workId', {}, {
        getJson : { method: 'GET', isArray:true}
    });
}]);

/**
 *  'Home'
 */

myAppServices.factory('Home', ['$resource' ,function($resource){
    return $resource('/admin/home', {}, {
        query: { method:'GET', isArray:true }
    });
}]);

/**
 *  'About'
 */

myAppServices.factory('About', ['$resource', function($resource){
    return $resource('/admin/about', {}, {
        query: { method:'GET', isArray: true}
    });
}]);