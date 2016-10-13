'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  HospitalReg = mongoose.model('HospitalReg');

/**
 * Globals
 */
var user,
  hospitalReg;

/**
 * Unit tests
 */
describe('Hospital reg Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      hospitalReg = new HospitalReg({
        // Add model fields
        name: 'Sample Hospital'
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      return hospitalReg.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should not be able to save if name is empty', function (done) {
      hospitalReg.name = '';
      return hospitalReg.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should not be able to save if name is not unique', function (done) {
      var hospitalReg1 = new HospitalReg({
        name: 'Sample Hospital',
        phone: '12345'
      });
      var hospitalReg2 = new HospitalReg({
        name: 'Sample Hospital',
        phone: '45378'
      });
      hospitalReg1.save(function () {
        hospitalReg2.save(function (err) {
          should.exist(err);
          hospitalReg1.remove(function (err) {
            should.not.exist(err);
            done();
          });
        });
      });
    });
  });

  afterEach(function(done) {
    HospitalReg.remove().exec();
    User.remove().exec();

    done();
  });
});
