'use strict';

/* Controllers */

var ExperimentController = angular.module('myApp.experimentControllers', []);

/**
 *  experimentCtrl
 */

ExperimentController.controller('experimentCtrl', [ '$scope', '$http', 'Experiments', function($scope, $http, Experiments){

    var activeClass = angular.element(document.querySelector('.active'));
    activeClass.removeClass('active');

    var navSelectedClass = angular.element(document.querySelector('#admin-experiment'));
    navSelectedClass.addClass('active');


    $scope.experiments = Experiments.query();

    var type;
    $scope.alert   = 'hide';
    $scope.created = 'hide';
    $scope.updated  = 'hide';
    $scope.deleted  = 'hide';

    $scope.orderProp = 'created';

    var hideCreated = function(){
        $scope.created = 'hide';
    };

    var hideUpdated = function(){
        $scope.updated = 'hide';
    };

    var hideDelete = function(){
        $scope.deleted  = 'hide';
    };

    $scope.experimentCreate = function (title, url, date) {
        var inputStatus = false;

        if (!title) {
            inputStatus = true;
            $scope.alertTitle = 'has-error';
        } else {
            $scope.alertTitle = '';
        }

        if (!url) {
            inputStatus = true;
            $scope.alertUrl = 'has-error';
        } else {
            $scope.alertUrl = '';
        }

        if (!type) {
            inputStatus = true;
            $scope.alertType = 'text-danger';
        } else {
            $scope.alertType = '';
        }

        if (!date) {
            $scope.alertDate = 'has-error';
            inputStatus = true;
        } else {
            $scope.alertDate = '';
        }

        if (inputStatus) {
            $scope.alert = 'show';
            return;
        } else {
            $scope.alert = 'hide';
        }

        var created = +new Date();
        var dataObject = {title: title, type: type, url: url, date: date, created: created};
        $http({method: 'POST', url: '/admin/create-experiment', data: dataObject})
            .success(function (data, status) {
                $scope.created = '';

                $scope.url = "";
                $scope.title = "";
                $scope.date = "";

                var angularType = angular.element(document.querySelector('.active'));
                angularType.removeClass('active');

                $scope.experiments.push(dataObject);

                setTimeout(function(){
                    $scope.$apply(hideCreated);
                }, 3000);
            })
            .error(function (data, status) {
                // todo:: add method for post error.
                console.log('error:');
                console.log(data);
                console.log(status);
            });
    };

    $scope.toggleSiteClick = function () {
        type = 'site';
    };

    $scope.toggleVideoClick = function () {
        type = 'video';
    };

    $scope.experimentEdit = function (id, experiment) {
        experiment.edit = 'edit-show';

        switch (experiment.type) {
            case 'site':
                experiment.siteType = 'active';
                break;
            case 'video':
                experiment.videoType = 'active';
                break
        }
    };

    $scope.toggleExpSiteClick = function (experiment) {
        console.log(experiment);
        experiment.type = 'site';
    };

    $scope.toggleExpVideoClick = function(experiment){
        console.log(experiment);
        experiment.type = 'video';
    };

    $scope.experimentUpdate = function( id, experiment){
        var title = experiment.title;
        var url   = experiment.url;
        var type  = experiment.type;
        var date  = experiment.date;
        var created = experiment.created;


        var dataObject = {title: title, type: type, url: url, date: date, created: created};
        var urlString = '/admin/update-experiment/' + id;
        $http({method: 'PUT', url: urlString, data: dataObject})
            .success(function (data, status) {
                $scope.updated = '';

                experiment.edit = '';

                setTimeout(function(){
                    $scope.$apply(hideUpdated);
                }, 3000);
            })
            .error(function (data, status) {
                // todo:: add method for post error.
                console.log('error:');
                console.log(data);
                console.log(status);
            });
    };

    $scope.experimentDelete = function(experiment){
        var id = experiment._id;

        var urlString =  '/admin/delete-experiment/' + id;
        $http({method: 'DELETE', url: urlString})
            .success( function(data, status){
                $scope.deleted = '';

                setTimeout(function(){
                    $scope.$apply(hideDelete);
                }, 3000);

                var length = $scope.experiments.length;
                for(var i = 0; i < length; i++){
                    var $experiment = $scope.experiments[i];

                    if($experiment == experiment){
                        if(i+1 < length){
                            var firstArray = $scope.experiments.slice(0, i);
                            var endArray   = $scope.experiments.slice(i + 1, length);
                            $scope.experiments = firstArray.concat(endArray);
                        }else{
                            $scope.experiments = $scope.experiments.slice(0, (length - 1));
                        }
                    }

                }

            })
            .error( function( data, status ){
                console.log('error:');
                console.log(data);
                console.log(status);
            });


    };
}]);
