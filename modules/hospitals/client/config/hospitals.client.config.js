(function() {
  'use strict';

  // Hospitals module config
  angular
    .module('hospitals')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Hospitals',
      state: 'hospitals',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'hospitals', {
      title: 'Hospitals Registration Requests',
      state: 'hospitals.list',
      roles: ['user']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'hospitals', {
      title: 'Create Hospital',
      state: 'hospitals.create',
      roles: ['*']
    });
  }
})();
