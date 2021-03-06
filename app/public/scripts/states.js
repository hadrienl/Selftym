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
      url: '/{channel:[a-zA-Z0-9]+}',
      templateUrl: 'scripts/components/channel/channel.html',
      controller: 'ChannelCtrl'
    });

  $locationProvider.html5Mode(true).hashPrefix('!');
});
