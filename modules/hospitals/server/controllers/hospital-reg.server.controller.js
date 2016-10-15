'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  HospitalReg = mongoose.model('HospitalReg'),
  User = mongoose.model('User'),
  randomString = require('randomstring'),
  generatePassword = require('password-generator'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Hospital reg
 */
exports.create = function (req, res) {

  var maxLength = 18;
  var minLength = 12;
  var uppercaseMinCount = 3;
  var lowercaseMinCount = 3;
  var numberMinCount = 2;
  var specialMinCount = 2;
  var UPPERCASE_RE = /([A-Z])/g;
  var LOWERCASE_RE = /([a-z])/g;
  var NUMBER_RE = /([\d])/g;
  var SPECIAL_CHAR_RE = /([\?\-])/g;
  var NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;

  function isStrongEnough(password) {
    var uc = password.match(UPPERCASE_RE);
    var lc = password.match(LOWERCASE_RE);
    var n = password.match(NUMBER_RE);
    var sc = password.match(SPECIAL_CHAR_RE);
    var nr = password.match(NON_REPEATING_CHAR_RE);
    return password.length >= minLength &&
      !nr &&
      uc && uc.length >= uppercaseMinCount &&
      lc && lc.length >= lowercaseMinCount &&
      n && n.length >= numberMinCount &&
      sc && sc.length >= specialMinCount;
  }

  function customPassword() {
    var password = "";
    var randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
    while (!isStrongEnough(password)) {
      password = generatePassword(randomLength, false, /[\w\d\?\-]/);
    }
    return password;
  }

  var hospitalReg = new HospitalReg(req.body);

  var user = new User({
    firstName: hospitalReg.name,
    lastName: 'TempUser',
    displayName: '',
    email: 'test@test.com',
    username: '',
    password: '',
    provider: 'local',
    roles: ['tempHA']
  });
  user.username = randomString.generate({
    length: 12,
    charset: 'alphabetic'
  });
  user.email = randomString.generate()+'@test.com';
  user.password = customPassword();
  user.tempPassword = user.password;
  user.displayName = user.firstName + ' ' + user.lastName;

  user.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      hospitalReg.creator = user;
      hospitalReg.save(function (err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json(hospitalReg);
        }
      });
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
  HospitalReg.find().populate('creator').exec(function (err, hospitalRegs) {
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
