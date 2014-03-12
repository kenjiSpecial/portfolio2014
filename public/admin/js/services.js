'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

/*var services = angular.module('services', ['ngResource']);
services.factory('Data', ['$resource', function($resource){
    return $resource('phones/', {}, {
        query: {method: 'GET', }
    });
}]);*/
/*
var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
    function($resource){
        return $resource('phones/:phoneId.json', {}, {
            query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
        });
}]);
    */