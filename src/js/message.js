'use strict';

window.angular.module('myApp.msg', ['ngRoute','ngAnimate'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/msg', {
      templateUrl: 'tpl/msg.html',
      controller: 'msgCtrl'
    });
  }])

  .controller('msgCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

    $scope.oldMsg='无消息'
    $scope.newMsg='无消息'
    $scope.msg=false;

    if(localStorage.getItem('accesstoken')==undefined){
      return;
    }
    $http.get('https://cnodejs.org/api/v1/messages?&'+'accesstoken='+localStorage.getItem('accesstoken')+'&mdrender=true')
    .then(function(result){
      //新消息
      if(result.data.data.hasnot_read_messages.length==0){
       $scope.msg=false;
      }else {
        $scope.msg=true;
        $scope.newMsg=result.data.data.hasnot_read_messages;
     }
     //过往消息
      if(result.data.data.has_read_messages.length==0){
        $scope.oldMsg='无消息'
      }
    } , function(err){
      console.log(err);
    }
  )
  }])
