'use strict';

window.angular.module('dir.goback', ['ngRoute','ngAnimate'])
  .directive('ngGoBack', [function() {
    return {
      restrict: 'AE',
      scope: {},
      replace: true,
      template: '<div class="go-back" ng-click="goBack()">返回</div>',
      // link: function ($scope, elm, attr, controller) {
      // },
      controller: ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude) {
        $scope.goBack = function() {
          window.history.go(-1);
        }
      }],
    }
  }])
