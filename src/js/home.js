'use strict';

// 加 window 避免 eslint 报错
window.angular.module('myApp.start', ['ngRoute','ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'tpl/home.html',
    controller: 'homeCtrl'
  });
}])

.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.topicList = [];
  $http.get('https://cnodejs.org/api/v1/topics?page=1&tab=&limit=10', {"timeout": 3000})
    .then(function(result) {
      console.log(result.data);
      $scope.topicList = $scope.topicList.concat(result.data.data);
    }, function(err){
      console.log(err);
    })
}])
