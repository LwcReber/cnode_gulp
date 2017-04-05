'use strict';

angular.module('myApp.start', ['ngRoute','ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/start', {
    templateUrl: 'tpl/start.html',
    controller: 'startCtrl'
  });
}])

.controller('startCtrl', ['$scope', '$location', '$timeout',function($scope, $location, $timeout) {
  console.log('test');
  $timeout(() => {
    $location.path('/main');
  }, 3000);
}])
