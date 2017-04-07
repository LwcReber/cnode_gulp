'use strict';
(function rem(baseWidth){
    var root = document.documentElement;
    var w = root.clientWidth;
    w = w > 640 ? 640 : w < 320 ? 320 : w;
    var fz = w / baseWidth * 100;
    root.style.fontSize = fz + "px";
}(375));

var CQuery = {
  scope: '',
  appendPic: function() {
    console.log(this.scope);
    setTimeout(function() {
      this.scope.result[0] = '<img src="test"/>';
    }.bind(this), 100)
  }
}

// 加 window 避免 eslint 报错
window.angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.start',
  'myApp.msg',
  'dir.footer',
  'dir.header',
  'dir.goback',
  // 'myApp.detail',
  // 'myApp.order',
  // 'myApp.orderList'
])
  .controller('parent', ['$scope', function($scope){
    // $scope.headerFile = 'tpl/header.html';
    // $scope.footerFile = 'tpl/footer.html';
  }])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise('/home');
  }])

  .run(['$http', function($http){
    $http.defaults.headers.post = {'Content-Type' : 'application/x-www-form-urlencoded'};

  }])
