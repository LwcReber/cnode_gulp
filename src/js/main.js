'use strict';

angular.module('myApp.main', ['ngRoute','ngAnimate'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/main', {
      templateUrl: 'tpl/main.html',
      controller: 'mainCtrl'
    });
  }])

  .controller('mainCtrl', ['$scope', '$http', function($scope,$http) {
    $scope.test = () => {
      console.log('babel test');
    }
    // test
    $scope.test();
  }])
