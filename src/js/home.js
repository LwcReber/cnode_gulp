'use strict';

// 加 window 避免 eslint 报错
window.angular.module('myApp.start', ['ngRoute','ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'tpl/home.html',
    controller: 'homeCtrl'
  });
}])

.controller('homeCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
  // 封装一个 获取后台数据的方法
  function getDatas(tab) { // tab用于切换不同tab时，
    $http.get('https://cnodejs.org/api/v1/topics?page=1&tab=' + tab + '&limit=10', {"timeout": 3000})
    .then(function(result) {
      $scope.topicList = $scope.topicList.concat(result.data.data);
    }, function(err){
      /* eslint-disable no-console */
      console.log(err);
      /* eslint-enable no-console */
    });
  }
  // 初次请求 （此方法 并不太推荐使用，$timeout 跟settimeout一样，会等其他程序都跑完才会执行，可能会出现空白）
  $timeout(function () {
    getDatas('');
  }, 0);

  // 主题导航
  $scope.tabs = [
    { tab: '', name: '全部', active: true },
    { tab: 'good', name: '精华', active: false },
    { tab: 'share', name: '分享', active: false },
    { tab: 'ask', name: '问答', active: false },
    { tab: 'job', name: '招聘', active: false },
  ];
  // 切换导航方法
  $scope.changeTopic = function(tab) {
    //
  }
  // topicList data
  $scope.topicList = [];


}])
