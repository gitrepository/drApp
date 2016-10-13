'use strict';

var hospitalReg = require('../controllers/hospital-reg.server.controller');

module.exports = function(app) {
  // Routing logic   
  app.route('/api/reg/hospitals')
    .get(hospitalReg.list)
    .post(hospitalReg.create);

  app.route('/api/reg/hospitals/:hospitalId')
    .delete(hospitalReg.delete);

  app.param('hospitalId', hospitalReg.hospitalRegByID);
};
