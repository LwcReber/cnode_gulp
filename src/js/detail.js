'use strict';

window.angular.module('myApp.detail', ['ngRoute','ngAnimate'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/detail', {
      templateUrl: 'tpl/detail.html',
      controller: 'detailCtrl'
    });
  }])

  .controller('detailCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.html = '';
    // 获取 topic id 编号
    var topicID = $location.search().topicID;
    // 如果 有路由参数传过来，就请求数据，容错处理 if else
    if (topicID) {
      $http.get('https://cnodejs.org/api/v1/topic/' + topicID + '?mdrender=true')
        .then(function(res) {
          $scope.html = res.data.data.content;
        }, function(err) {
          /* eslint-disable no-console*/
          console.log(err);
          /* eslint-enable no-console */
        });
    } else {
      // 如果没有id ，就返回前一页
      // 使用 浏览器 默认 返回  history.go(-1) , -1:表示后退一步
      window.history.go(-1);
    }
  }])
