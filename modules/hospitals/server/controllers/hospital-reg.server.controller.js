'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  HospitalReg = mongoose.model('HospitalReg'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Hospital reg
 */
exports.create = function (req, res) {
  var hospitalReg = new HospitalReg(req.body);

  hospitalReg.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(hospitalReg);
    }
  });
};

/**
 * Show the current Hospital reg
 */
exports.read = function (req, res) {

};

/**
 * Update a Hospital reg
 */
exports.update = function (req, res) {

};

/**
 * Delete an Hospital reg
 */
exports.delete = function (req, res) {
  var hospitalReg = req.hospitalReg;
  hospitalReg.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(hospitalReg);
    }
  });
};

/**
 * List of Hospital regs
 */
exports.list = function (req, res) {
  HospitalReg.find().exec(function (err, hospitalRegs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(hospitalRegs);
    }
  });
};

/**
 * Hospital Middleware
 */
exports.hospitalRegByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Hospital Reg ID is invalid'
    });
  }

  HospitalReg.findById(id).exec(function (err, hospitalReg) {
    if (err) {
      return next(err);
    } else if (!hospitalReg) {
      return res.status(404).send({
        message: 'No Hospital Reg with that identifier has been found'
      });
    }
    req.hospitalReg = hospitalReg;
    next();
  });
};
