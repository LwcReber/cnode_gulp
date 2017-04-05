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
    var firstList= null;
    $http.get('data/dish_getbypage.php')
      .success(function(data){
        $scope.dishList = data;
        firstList = data;
      });
    //搜索功能
    $scope.$watch('kw',function() {
      if ($scope.kw) {
        $http.get("data/dish_getbykw.php?kw=" + $scope.kw)
          .success(function (data) {
            $scope.dishList = data;
          });
      }else{
        $scope.dishList =firstList;
      }
    });
    $scope.hasMore=true;
    //加载更多监听函数
    $scope.loadMore=function(){
      $http.get("data/dish_getbypage.php?start="+$scope.dishList.length)
        .success(function(data){
          data.length<=5&&($scope.hasMore=false);
          $scope.dishList =$scope.dishList.concat(data);
        });
    }
  }])
