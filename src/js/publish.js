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
    $scope.warn = false;
    $scope.submit=function(){
      //没有登录不能发表主题
      if(localStorage.getItem('accesstoken')==undefined){
        alert('请登录')
        return;
      }
      //内容为空不发送请求
      if($scope.title==undefined||$scope.pubSel==undefined||$scope.markdown==undefined){
        $scope.warn = true;
        return;
      }
      $scope.warn = false;
      $http.post('https://cnodejs.org/api/v1/topics',
      {
        accesstoken:localStorage.getItem('accesstoken'),
        title:$scope.title,
        tab:$scope.pubSel,
        content:$scope.markdown
      })
      .then(function(result){
        alert('发表成功')
      },function(err){
        alert('频率限制：当前操作每天可以进行 7 次')
      })
    }
  }])
