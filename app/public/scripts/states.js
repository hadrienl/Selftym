'use strict';

angular.module('selftym')
.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
    .state('selftym', {
      abstract: true,
      template: '<ui-view></iu-view>'
    })
    .state('selftym.home', {
      url: '/',
      templateUrl: 'views/home.html'
    })
    .state('selftym.channel', {
      url: '/:channel',
      template: '<p>{{ channel }}</p>',
      controller: function ($scope, $stateParams) {
        $scope.channel = $stateParams.channel;
      }
    });

  $locationProvider.html5Mode(true).hashPrefix('!');
});
