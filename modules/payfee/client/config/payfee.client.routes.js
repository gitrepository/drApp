(function () {
  'use strict';

  //Setting up route
  angular
    .module('payfee')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Payfee state routing
    $stateProvider
      .state('pay-fee', {
        url: '/pay-fee',
        templateUrl: 'modules/payfee/client/views/payfee.client.view.html',
        controller: 'PayfeeController',
        controllerAs: 'vm',
        data: {
          roles: ['tempHA']
        }
      });
  }
})();
