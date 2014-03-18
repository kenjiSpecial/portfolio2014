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

    $scope.workDelete = function(id){
        console.log(id);
        console.log(this);
        var index = this.$index;

        var urlString = '/admin/delete-work/' + id;
        //console.log(urlString);
        $http({method: 'DELETE', url: urlString})
            .success(function(){
                if($scope.works.length == (index + 1)){
                   $scope.works = $scope.works.slice(0, index);
                }else{
                    var firstArray = $scope.works(0, index);
                    var endArray   = $scope.works(0, $scope.works.length);
                    $scope.works   = firstArray.concat(endArray);
                }
            })
            .error(function(date, status){
                //alert('error');
                console.log('error');
            });

    }

}]);

/**
 * WorkCreateCtrl
 */

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

    $scope.technologies = [{label: 'JavaScript', type: false}, {label: 'C++', type: false}, {label: 'Objective C', type: false}];
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

/**
 * workUpdateCtrl
 */

AppWorkController.controller('workUpdateCtrl', ['$scope', '$routeParams', '$http', '$location', 'Work', function($scope, $routeParams, $http, $location, Work){
    var workId = $routeParams.workId;

    var technologyList = ['JavaScript', 'C++', 'Objective C'];
    $scope.work   = Work.getJson({workId: workId}, function(data){
        var workData = data[0];
        var technologies = workData.technologies;
        var technology;
        var indexOfTechnology;


        $scope.title = workData.title;
        $scope.url = workData.url;
        $scope.year = workData.year;
        $scope.type = workData.type;
        $scope.medium = workData.medium;

        for(var i = 0; i < technologies.length; i++){
            technology = technologies[i];
            indexOfTechnology = technologyList.indexOf(technology);
            if(indexOfTechnology > 0) $scope.technologies[indexOfTechnology].type = true;
        }

        $scope.agency.name = workData.agency.name;
        $scope.agency.url  = workData.agency.url;

        $scope.client.name = workData.client.name;
        $scope.client.url  = workData.client.url;

        $scope.description = workData.description;

    });

    // initialize the variables

    $scope.agency = {};
    $scope.client = {};

    var activeClass = angular.element(document.querySelector('.active'));
    activeClass.removeClass('active');

    var navSelectedClass = angular.element(document.querySelector('#admin-works'));
    navSelectedClass.addClass('active');

    $scope.years = [ 2010, 2011, 2012, 2013, 2014 ];
    $scope.types = ['client work', 'personal project'];
    $scope.mediums = ['site', 'app'];

    $scope.technologies = [{label: 'JavaScript', type: false}, {label: 'C++', type: false}, {label: 'Objective C', type: false}];
    $scope.technologyToggle = function () {
        this.technology.type = !this.technology.type;
    };

    // update work
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

        var urlString = '/admin/update-work/' + workId;
        $http({method: 'PUT', url: urlString, data: data})
            .success(function(data, status){
                $location.url('/works');
                console.log('success');
            })
            .error(function(data, status){
                alert('error');
            });
    }


}]);


