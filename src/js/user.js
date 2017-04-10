'use strict';

window.angular.module('myApp.user', ['ngRoute', 'ngAnimate'])
  .config(['$routeProvider' , function($routeProvider){
    $routeProvider
    .when('/user', {
      templateUrl: 'tpl/user.html',
      controller: 'userCtrl'
    });
  }])

  .controller('userCtrl' , ['$scope' , '$http' , '$timeout',function($scope,$http,$timeout){
    //获取用户详情
    $http.get('https://cnodejs.org/api/v1/user/LwcReber')
    .then(function(result){
      $scope.userMsg=result.data.data;
    },function(err){
      console.log(err);
    })
     $scope.collTopicList=[];
    //获取用户收藏的主题
    $http.get('https://cnodejs.org/api/v1/topic_collect/LwcReber')
    .then(function(result){
      console.log(result);
      $scope.uesTopiccal = result.data.data.length
      $scope.collTopicList =$scope.collTopicList.concat(result.data.data);
    },function(err){
      console.log(err);
    })
  }])
