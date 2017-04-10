'use strict';

window.angular.module('dir.header', ['ngRoute','ngAnimate'])
  .directive('ngHeader', ['$location',function($location) {
    return {
      restrict: 'E',
      scope: {},
      replace: true,
      templateUrl: './tpl/header.html',
      // link: function ($scope, elm, attr, controller) {
      // }, , $element, $attrs, $transclude
      controller: ['$scope', function($scope) {
        $scope.title = 'header';
        $scope.path = $location.path();
        // 导航
        // 切换导航时，更换路由
      
      }],
    }
  }])
