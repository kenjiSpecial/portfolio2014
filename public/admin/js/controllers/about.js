'use strict';

var aboutController = angular.module('myApp.aboutControllers', []);

/**
 *  aboutCtrl
 */

aboutController.controller('aboutCtrl', ['$scope', '$http', 'About', function ($scope, $http, About) {
    var activeClass = angular.element(document.querySelector('.active'));
    activeClass.removeClass('active');

    var navSelectedClass = angular.element(document.querySelector('#admin-about'));
    navSelectedClass.addClass('active');

    $scope.samples = About.query();

    var hideCreated = function () {
        $scope.isAlert = false;
        $scope.isAlertCreate = false;
    };

    var hideUpdate = function () {
        $scope.isAlertUpdate = false;
    };

    $scope.delete = function () {
        var sample = this.sample;
        var index = this.$index;

        var id = sample._id;

        var urlString = '/admin/delete-about/' + id;
        $http({method: 'DELETE', url: urlString})
            .success(function (data, status) {
                if ($scope.samples.length == (index + 1)) {
                    $scope.samples = $scope.samples.slice(0, index);
                } else if (index === 0) {
                    $scope.samples = $scope.samples.slice(1, $scope.samples.length);
                } else {
                    var firstArray = $scope.samples(0, index);
                    var endArray = $scope.samples((index + 1), $scope.samples.length);
                    $scope.samples = firstArray.concat(endArray);
                }
            })
            .error(function (data, status) {
                console.log('error:');
                console.log(data);
                console.log(status);
            });
    };

    $scope.update = function () {
        var sample = this.sample;
        var type = sample.type;
        var description = sample.description;
        var id = sample._id;

        var urlString = '/admin/update-about/' + id;
        var data = {
            type : type,
            description: description
        }
        console.log(data);

        $http({method: 'PUT', url: urlString, data: data})
            .success(function (data, status) {
                $scope.isAlertUpdate = true;

                setTimeout(function () {
                    $scope.$apply(hideUpdate);
                }, 3000);
            })
            .error(function (data, status) {
                console.log('error:');
                console.log(data);
                console.log(status);
            });

    };

    $scope.create = function () {
        var type        = $scope.type;
        var description = $scope.description;

        if (description) {
            $scope.isAlert = false;
            $scope.isAlertError = false;
        } else {
            $scope.isAlert = true;
            $scope.isAlertError = true;

            return;
        }

        var created = +new Date();

        var data = { type: type, description: description, created: created };

        $http({method: 'POST', url: '/admin/create-about', data: data})
            .success(function (data, status) {
                $scope.type = '';
                $scope.description = '';

                $scope.samples.push(data);

                $scope.isAlert = true;
                $scope.isAlertCreate = true;

                setTimeout(function () {
                    $scope.$apply(hideCreated);
                }, 3000);

            })
            .error(function (data, status) {
                console.log('error:');
                console.log(data);
                console.log(status);
            });

    };

}]);
