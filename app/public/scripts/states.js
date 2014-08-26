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
    .state('selftym.channeljoin', {
      url: '/{channel:[a-zA-Z0-9]+}/join',
      templateUrl: 'views/channels/join.html',
      controller: 'JoinCtrl'
    })
    .state('selftym.channel', {
      url: '/{channel:[a-zA-Z0-9]+}',
      template: '<p>{{ channel }}</p>',
      controller: function ($scope, $stateParams) {
        $scope.channel = $stateParams.channel;
      }
    });

  $locationProvider.html5Mode(true).hashPrefix('!');
});
