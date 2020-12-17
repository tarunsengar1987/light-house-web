'use strict';

// Register `chartList` component, along with its associated controller and template
angular.
  module('chartList').
  component('chartList', {
    templateUrl: 'chart-list/chart-list.template.html',
    controller: ['Client', 'Chart',
      function ChartListController(Client, Chart) {
        var self = this;

        self.selectedClient = "";
        self.startDate;
        self.endDate;
        self.resultCount = 0;

        getClients();
        setAllChartOption();
        resetPieChartValue();
        setBarChart();

        $(function () {
          $('input[name="dates"]').daterangepicker({
            autoUpdateInput: false,
            locale: {
              format: 'YYYY-MM-DD'
            }
          }, function (start, end, label) {
            self.startDate = start.format('YYYY-MM-DD');
            self.endDate = end.format('YYYY-MM-DD');
            getChartData();
          });
        });

        /**
         * Called when user change the client
         */
        self.changeClient = function () {
          getChartData()
        }

        /**
         * Used to get all client list
         */
        function getClients() {
          Client.get().$promise.then(function (response) {
            self.clients = response.data;
            self.selectedClient = self.clients[0].client;
            getChartData(self.selectedClient, self.startDate, self.endDate);
          });
        }

        /**
         * Used to get all the chart data
         */
        function getChartData() {
          console.log();
          Chart.get({ client: self.selectedClient, startDate: self.startDate, endDate: self.endDate }).$promise.then(function (result) {
            self.resultCount = result.data.length;
            setPieChart(result.data);
            setBarChart(result.data);
          });
        }

        /**
         * Used to set the bar chart data based on api result
         * @param {*} list 
         */
        function setBarChart(list = []) {
          self.barChartLabels = list.map(item => item.timestamp);
          self.barChartData = [
            list.map(item => item.response200),
            list.map(item => item.response400),
            list.map(item => item.response500)
          ];
        }

        /**
         * Used to set Pie chart
         * @param {*} list 
         */
        function setPieChart(list) {
          resetPieChartValue();
          let firstValue = 0;
          let secondValue = 0;
          let thirdValue = 0;
          list.map((item) => {
            firstValue = firstValue + item['response200'];
            secondValue = secondValue + item['response400'];
            thirdValue = thirdValue + item['response500'];
          });
          resetPieChartValue(firstValue, secondValue, thirdValue);
        }

        /**
         * Used to reset pie chart value
         * @param {*} firstValue 
         * @param {*} secondValue 
         * @param {*} thirdValue 
         */
        function resetPieChartValue(firstValue = 0, secondValue = 0, thirdValue = 0) {
          self.pieChartData = [
            {
              key: "200",
              y: firstValue
            },
            {
              key: "400",
              y: secondValue
            },
            {
              key: "500",
              y: thirdValue
            }
          ];
        }

        /**
         * Used to set all chart option
         */
        function setAllChartOption() {

          // For pie chart option
          self.pieChartOptions = {
            chart: {
              type: 'pieChart',
              height: 270,
              x: function (d) { return d.key; },
              y: function (d) { return d.y; },
              showLabels: true,
              duration: 500,
              labelThreshold: 0.01,
              labelSunbeamLayout: true,
              legend: {
                margin: {
                  top: 5,
                  right: 35,
                  bottom: 5,
                  left: 0
                }
              }
            }
          };

          // for bar chart series
          self.barChartSeries = ['200', '400', '500'];

          // For bar chart option
          self.barChartOptions = {
            scales: {
              xAxes: [{
                stacked: true
              }],
              yAxes: [{
                stacked: true
              }]
            },
            legend: {
              display: true,
              position: 'bottom'
            }
          };

          // For line chart option
          self.lineChartOptions = {
            scales: {
              xAxes: [{
                stacked: true
              }],
              yAxes: [{
                stacked: true
              }]
            },
            legend: {
              display: true,
              position: 'bottom'
            }
          };

          // for bar chart colors
          self.barChartColors = [
            {
              backgroundColor: "#2077b4"
            },
            {
              backgroundColor: "#aec7e8"
            },
            {
              backgroundColor: "#ff7f10"
            }
          ];
        }
      }
    ]
  });

