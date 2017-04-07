'use strict';

window.angular.module('myApp.msg', ['ngRoute','ngAnimate'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/msg', {
      templateUrl: 'tpl/msg.html',
      controller: 'msgCtrl'
    });
  }])

  .controller('msgCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

  }])
