(function () {
  'use strict';

  //Setting up route
  angular
    .module('hospitals')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Hospitals state routing
    $stateProvider
      .state('hospitals', {
        abstract: true,
        url: '/hospitals',
        templateUrl: '<ui-view/>'
      })
      .state('hospitals.list', {
        url: '',
        templateUrl: 'modules/hospitals/client/views/hospital-list.client.view.html',
        controller: 'HospitalsController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('hospitals.create', {
        url: '/create',
        templateUrl: 'modules/hospitals/client/views/hospital-create.client.view.html',
        controller: 'HospitalsController',
        controllerAs: 'vm'
      });
  }
})();
