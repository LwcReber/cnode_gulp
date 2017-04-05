'use strict';

angular.module('dir.header', ['ngRoute','ngAnimate'])
  .directive('ngHeader', [function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './tpl/header.html',
      link: function ($scope, elm, attr, controller) {
      }
    }
  }])
