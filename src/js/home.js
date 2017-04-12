'use strict';

// 加 window 避免 eslint 报错
window.angular.module('myApp.start', ['ngRoute','ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'tpl/home.html',
    controller: 'homeCtrl'
  });
}])

.controller('homeCtrl', ['$scope', '$http', '$timeout', '$location', function($scope, $http, $timeout, $location) {
  $scope.scroll=false;
  $scope.hasMore=true;
  // topicList data
  $scope.topicList = [];

  // 封装一个 获取后台数据的方法
  $scope.getDatas= function(tab) { // tab用于切换不同tab时，
    $scope.scroll=true;//禁止滚动执行事件
    $http.get('https://cnodejs.org/api/v1/topics?page=1&tab=' + tab + '&limit=20', {"timeout": 3000})
    .then(function(result) {
      if(Object.prototype.toString.call(result).indexOf('Object')!=-1){
        //没有更多内容
        if(result.data.data.lenth<20){
          $scope.hasMore=false;
        }else {
          $scope.scroll=false;
        }
        $scope.topicList = $scope.topicList.concat(result.data.data);
      }else {
        console.log('后台发送的topicList数据类型错误')
      }
    }, function(err){
      /* eslint-disable no-console */
      //console.log(err);
      /* eslint-enable no-console */
    });
  }

  // 初次请求 （此方法 并不太推荐使用，$timeout 跟settimeout一样，会等其他程序都跑完才会执行，可能会出现空白）
  // $timeout(function () {
  //   $scope.getDatas('');
  // }, 0);

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
    //清除其他tab的active
    for(var i=0 ; i<$scope.tabs.length ;i++){
      if($scope.tabs[i]!=tab){
        $scope.tabs[i].active=false;
      }
    }
    tab.active=true;
    //清空原有的数据
    $scope.topicList = [];
    //请求对应的tab数据
    $scope.getDatas(tab.tab);
  }

}])
