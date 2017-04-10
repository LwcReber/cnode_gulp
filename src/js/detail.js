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
    $scope.collStu={
      status:"",
      content:""
    };
    // 获取 topic id 编号
    var topicID = $location.search().topicID;
    // 如果 有路由参数传过来，就请求数据，容错处理 if else
    if (topicID) {
      $http.get('https://cnodejs.org/api/v1/topic/' + topicID + '?mdrender=true'+'&accesstoken=32794b15-c1e8-4d80-8170-fdfb52d65a70')
        .then(function(res) {
          //判断主题是否被收藏
          $scope.collStu.status= res.data.data.is_collect;
          //如果被收藏就显示取消收藏  true 主题已经被收藏  false 主题没有收藏
          if($scope.collStu.status==true){
            $scope.collStu.content = '取消收藏'
          }else {
              $scope.collStu.content = '收藏'
          }
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
    //收藏按钮的状态
    //需要获取用户所收藏的主体与之进行判断。然后显示主体是否被收藏
    $scope.coll = function(){
      //收藏主题
      if($scope.collStu.status==false){
        $http.post('https://cnodejs.org/api/v1/topic_collect/collect',
          {
            accesstoken:"32794b15-c1e8-4d80-8170-fdfb52d65a70",
            topic_id:topicID
          }
        )
        .then(function(result){
          console.log(result);
          //收藏成功 ，改变按钮显示
        //  if(result.data.success== true){
            $scope.collStu.status = true;
            $scope.collStu.content = '取消收藏'
        //  }
        },function(err){
          console.log(err);
        })
      }else {//取消收藏
        $http.post('https://cnodejs.org/api/v1/topic_collect/de_collect',
          {
            accesstoken:"32794b15-c1e8-4d80-8170-fdfb52d65a70",
            topic_id:topicID
          }
        )
        .then(function(result){
          //console.log(result);
        //  if(result.data.success == true){
            $scope.collStu.status = false;
            $scope.collStu.content='收藏'
          //}
        },function(err){
          console.log(err);
        })
     }
    }
  }])
