'use strict';
(function rem(baseWidth){
    var root = document.documentElement;
    var w = root.clientWidth;
    w = w > 640 ? 640 : w < 320 ? 320 : w;
    console.log(w);
    var fz = w / baseWidth * 100;
    root.style.fontSize = fz + "px";
}(720));

angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.start',
  'myApp.main',
  'dir.footer',
  'dir.header'
  // 'myApp.detail',
  // 'myApp.order',
  // 'myApp.orderList'
])
  .controller('parent', ['$scope', function($scope){
    // $scope.headerFile = 'tpl/header.html';
    // $scope.footerFile = 'tpl/footer.html';
  }])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise('/start');
  }])

  .run(['$http', function($http){
    $http.defaults.headers.post = {'Content-Type' : 'application/x-www-form-urlencoded'};
  }])
