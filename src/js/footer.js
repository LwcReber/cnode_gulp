'use strict';

angular.module('dir.footer', ['ngRoute','ngAnimate'])
  .directive('ngFooter', [function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './tpl/footer.html',
      link: function ($scope, elm, attr, controller) {

      }
    }
  }])
