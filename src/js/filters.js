'use strict';

window.angular.module('myApp.filtes', ['ngRoute','ngAnimate'])
.filter('to_trusted', ['$sce', function ($sce) {
  return function (text) {
    return $sce.trustAsHtml(text);
  };
}])
