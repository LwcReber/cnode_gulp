'use strict';

angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.start',
  'myApp.main'
  // 'myApp.detail',
  // 'myApp.order',
  // 'myApp.orderList'
])
  .controller('parent', ['$scope', function($scope){
    $scope.headerFile = 'tpl/header.html';
    $scope.footerFile = 'tpl/footer.html';
  }])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise('/start');
  }])
  .run(function($http){
    $http.defaults.headers.post = {'Content-Type' : 'application/x-www-form-urlencoded'};
  })
