'use strict';

angular.module('myApp.start', ['ngRoute','ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/start', {
    templateUrl: 'tpl/start.html',
    controller: 'startCtrl'
  })
  
}])

.controller('startCtrl', ['$location','$timeout',function($location,$timeout) {

  $timeout(function(){
    console.log($location);
    $location.path('/main');
  },3000);
}])
