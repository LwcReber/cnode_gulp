'use strict';

window.angular.module('dir.footer', ['ngRoute', 'ngAnimate'])
  .directive('ngFooter', ['$location', function($location) {
    return {
      restrict: 'AE',
      replace: true,
      scope: {},
      templateUrl: './tpl/footer.html',
      controller: ['$scope', function($scope) {
        // 用于判断当前处于哪个 tab页，给对应的tab 导航键 加激活样式
        $scope.path = $location.path();
        // 导航
        $scope.navs = [
          { tab: 'home', path: '/home' },
          { tab: 'msg', path: '/msg' },
          { tab: 'publish', path: '/publish' },
          { tab: 'user', path: '/user' }
        ];
        // 切换导航时，更换路由
        $scope.changeTab = function (nav) {
          $location.path(nav.path);
        }

      }]
      // link: function ($scope, elm, attr, controller) {
      //
      // }
    }
  }])
