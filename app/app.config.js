'use strict';

angular.
  module('chartApp').
  // for routes
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/charts', {
          template: '<chart-list></chart-list>'
        }).
        otherwise('/charts');
    }
  ]);
