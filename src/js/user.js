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
    $scope.collTopicList=[];
    //用户详情
    $scope.getUser=function(){
      $http.get('https://cnodejs.org/api/v1/user/'+localStorage.getItem('loginname'))
      .then(function(result){
        $scope.loginname = result.data.data.loginname;
        $scope.userImg = result.data.data.avatar_url;
      }, function(err){
          console.log(err);
      })
    }
    //获取用户收藏的主题
    $scope.collect=function(){
      $http.get('https://cnodejs.org/api/v1/topic_collect/'+localStorage.getItem('loginname'))
      .then(function(result){
        $scope.userTopiccal = result.data.data.length;
        $scope.collTopicList =$scope.collTopicList.concat(result.data.data);
      },function(err){
        console.log(err);
      })
    }

    //判断是否支持localStorage
    if (localStorage) {
      //判断localStorage 是否有userInfo属性
      if(localStorage.userInfo){
        //如果已经登录  显示userInfo
        localStorage.getItem('userInfo') =='true'? ($scope.userInfo = true) :($scope.userInfo = false)
        //获取用户详情
        $scope.getUser();
        //获取收藏话题
        $scope.collect();
      }else {
        //没有userInfo属性 不显示用户内容
        $scope.userInfo =false;
      }
    } else {
        console.log('不支持localStorage');
    }

    //改变登录按钮显示的文字
    if($scope.userInfo ==true){
      $scope.regBtn = '退出'
    }else {
      $scope.regBtn = '登录'
    }

    $scope.reg=function(){
      //登录
      if($scope.regBtn=='登录'){
        //如果没有输入accesstoken
        if($scope.accesstoken==undefined){
          $scope.accWarn=true;
          return;
        }
        $scope.accWarn=false;
        localStorage.setItem('accesstoken', $scope.accesstoken)
        $http.post('https://cnodejs.org/api/v1/accesstoken',{accesstoken:$scope.accesstoken})
        .then(function(result){
          alert('登录成功');
          $scope.userInfo=true;
          //本地保存登录状态
          localStorage.setItem('userInfo' , $scope.userInfo);
          $scope.loginname = result.data.loginname
          //保存用户名，用点击user ，请求获取用户的详情
          localStorage.setItem('loginname' ,$scope.loginname)
          //替换头像
          $scope.userImg = result.data.avatar_url;
          $scope.regBtn = '退出'
          //刷新收藏话题
          $scope.collect();
          console.log(result);
        },function(err){
          console.log(err);
          alert('登录失败!! 原因:没有输入accesstoken,或者accesstoken不正确')
        })

      }else {//退出登录
        //清除原有的内容
        $scope.collTopicList.length=0;
        //清除当前的accesstoken
        localStorage.removeItem('accesstoken');
        $scope.userInfo=false;
        //保存退出状态
        localStorage.setItem('userInfo' , $scope.userInfo);
        $scope.regBtn='登录'
      }
    }

  }])
