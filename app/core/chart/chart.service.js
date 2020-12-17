'use strict';

angular
  .module('core.chart')
  // Used to get the client data
  .factory('Client', ['$resource',
    function ($resource) {
      return $resource('http://localhost:3000/chart/clients', {}, {
        query: {
          method: 'GET'
        }
      });
    }
  ])
  // Used to get the chart data
  .factory('Chart', ['$resource',
    function ($resource) {
      return $resource('http://localhost:3000/chart/chart-data', {}, {
        query: {
          method: 'GET',
          params: {client: 'client', startDate: 'startDate', endDate: 'endDate'},
          isArray: true
        }
      });
    }
  ]);
