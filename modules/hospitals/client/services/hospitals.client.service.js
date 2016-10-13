(function () {
  'use strict';

  angular
    .module('hospitals')
    .factory('HospitalRegs', HospitalRegs);

  HospitalRegs.$inject = ['$resource'];

  function HospitalRegs($resource) {
    // Hospitals service logic
    // ...

    // Public API
    return $resource('/api/reg/hospitals/:hospitalId', {
      hospitalId: '@_id'
    },{
      update: {
        method: 'PUT'
      }
    });
  }
})();
