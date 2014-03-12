'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('AppCtrl',function ($scope, $http) {

        $http({
            method: 'GET',
            url: '/admin/experiment'
        }).
            success(function (data, status, headers, config) {
                $scope.experiments = data;
            }).
            error(function (data, status, headers, config) {
                $scope.name = 'Error!';
            });

    }).
    controller('MyCtrl1',function ($scope) {
        // write Ctrl here
        //alert('MyCtrl1')

    }).
    controller('MyCtrl2',function ($scope) {
        // write Ctrl here
        //alert('MyCtrl2');
    }).
    controller('experimentCtrl', function ($scope, $http) {
        var type;
        $scope.alert = 'hide';

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


            var dataObject = {title: title, type: type, url: url, date: date};
            $http({method: 'POST', url: '/admin/create-experiment', data: dataObject})
                .success(function (data, status) {
                    // todo:: add method for post success.
                    console.log('success:');
                    console.log(data);
                    console.log(status);

                    $scope.url = "";
                    $scope.title = "";
                    $scope.date = "";

                    var angularType = angular.element(document.querySelector('.active'));
                    angularType.removeClass('active');
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

            console.log(title , url , type, date);

            var dataObject = {title: title, type: type, url: url, date: date};
            var urlString = '/admin/update-experiment/' + id;
            $http({method: 'PUT', url: urlString, data: dataObject})
                .success(function (data, status) {
                    // todo:: add method for post success.
                    console.log('success:');
                    console.log(data);
                    console.log(status);


                    experiment.edit = '';

                })
                .error(function (data, status) {
                    // todo:: add method for post error.
                    console.log('error:');
                    console.log(data);
                    console.log(status);
                });
        };

    });
