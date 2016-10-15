(function() {
  'use strict';

  // Payfee module config
  angular
    .module('payfee')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Config logic
    Menus.addMenuItem('topbar', {
      title: 'Pay Fee',
      state: 'pay-fee',
      roles: ['tempHA']
    });
  }
})();
