'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

var myAppServices = angular.module('myApp.services', ['ngResource']);

myAppServices.factory('Experiments', ['$resource', function($resource){
    return $resource('/admin/experiment', {}, {
        query: {method:'GET', isArray:true}
    });
}]);
