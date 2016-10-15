(function() {
  'use strict';

  angular
    .module('payfee')
    .controller('PayfeeController', PayfeeController);

  PayfeeController.$inject = ['$scope'];

  function PayfeeController($scope) {
    var vm = this;

    // Payfee controller logic
    // ...

    init();

    function init() {
    }
  }
})();
