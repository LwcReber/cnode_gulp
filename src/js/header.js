'use strict';

window.angular.module('dir.header', ['ngRoute','ngAnimate'])
  .directive('ngHeader', [function() {
    return {
      restrict: 'E',
      scope: {},
      replace: true,
      templateUrl: './tpl/header.html',
      // link: function ($scope, elm, attr, controller) {
      // }, , $element, $attrs, $transclude
      controller: ['$scope', function($scope) {
        $scope.title = 'header';
      }],
    }
  }])
