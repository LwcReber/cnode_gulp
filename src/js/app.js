'use strict';

(function rem(baseWidth){
    var root = document.documentElement;
    var w = root.clientWidth;
    w = w > 640 ? 640 : w < 320 ? 320 : w;
    var fz = w / baseWidth * 100;
    root.style.fontSize = fz + "px";
}(414))

// 加 window 避免 eslint 报错
window.angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'infinite-scroll',
    'myApp.start',
    'myApp.msg',
    'myApp.detail',
    'myApp.filtes', // 所有的指令模块
    'dir.footer',
    'dir.header',
    'dir.goback',
    'myApp.publish',
    'myApp.user'
    // 'myApp.detail',
    // 'myApp.order',
    // 'myApp.orderList'
  ])
  .controller('parentCtrl',['$scope','$location',function($scope,$location){
    // 查看topic 详情
    $scope.showTDetail = function(id) {
      // 转跳到详情页
      $location.path('/detail').search({topicID: id});
    }
  }])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise('/home');
  }])

  .run(['$http', function($http){
    $http.defaults.headers.post = {'Content-Type' : 'application/json; charset=utf-8'};

  }])
