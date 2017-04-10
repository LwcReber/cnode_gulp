'use strict';

window.angular.module('myApp.publish', ['ngRoute', 'ngAnimate'])
  .config(['$routeProvider' , function($routeProvider){
    $routeProvider
    .when('/publish', {
      templateUrl: 'tpl/publish.html',
      controller: 'publishCtrl'
    });
  }])

  .controller('publishCtrl' , ['$scope' , '$http' , '$timeout',function($scope,$http,$timeout){
    $scope.get=function(){
      console.log($scope.pubSel);
    }
  }])
