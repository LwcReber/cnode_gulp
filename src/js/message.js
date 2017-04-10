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

    $http.get('https://cnodejs.org/api/v1/messages?&'+'accesstoken=32794b15-c1e8-4d80-8170-fdfb52d65a70'+'&mdrender=true')
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
