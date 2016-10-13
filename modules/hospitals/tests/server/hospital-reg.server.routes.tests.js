'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  HospitalReg = mongoose.model('HospitalReg'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Global variables
 */
var app, agent, credentials, user, hospitalReg;

/**
 * posts routes tests
 */
describe('Post CRUD tests', function () {
  before(function (done) {
    app = express.init(mongoose);
    agent = request.agent(app);
    done();
  });

  beforeEach(function (done) {
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    user = new User({
      firstName: 'MEAN',
      lastName: 'JS',
      displayName: 'MEANJS',
      email: 'meanjs@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    user.save(function () {
      hospitalReg = {
        name: 'Sample Hospital',
        phone: '123456'
      };
      done();
    });
  });

  // HTTP POST /api/reg/hospitals
  it('should be able to save an hospital reg', function (done) {
    agent.post('/api/reg/hospitals')
      .send(hospitalReg)
      .expect(200)
      .end(function (hospitalRegSaveErr, hospitalRegSaveRes) {
        if (hospitalRegSaveErr) {
          return done(hospitalRegSaveErr);
        }
        HospitalReg.find().exec(function (err, hospitalRegs) {
          if (err) {
            return done(err);
          }
          (hospitalRegs[0].name).should.match('Sample Hospital');
          (hospitalRegs[0].phone).should.match('123456');
          done();
        });
      });
  });

  // HTTP GET /api/reg/hospitals
  it('should be able to get a list of posts if logged in', function (done) {
    var hospitalRegObj = new HospitalReg(hospitalReg);
    hospitalRegObj.save(function () {
      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signInErr, signInRes) {
          if (signInErr) {
            return done(signInErr);
          }
          agent.get('/api/reg/hospitals')
            .expect(200)
            .end(function (postGetErr, postGetRes) {
              if (postGetErr) {
                return done(postGetErr);
              }
              postGetRes.body.should.be.instanceof(Array).and.have.lengthOf(1);

              done();
            });
        });
    });
  });
  // HTTP GET /api/posts/:postID
  // HTTP DELETE /api/reg/hospitals/:hospitalID
  it('should be able to delete a post if logged in', function (done) {
    var hospitalRegObj = new HospitalReg(hospitalReg);
    hospitalRegObj.save(function () {
      agent.post('/api/auth/signin')
        .send(credentials)
        .expect(200)
        .end(function (signInErr, signInRes) {
          if (signInErr) {
            return done(signInErr);
          }
          agent.delete('/api/reg/hospitals/'+hospitalRegObj._id)
            .expect(200)
            .end(function (postDeleteErr, postDeleteRes) {
              if (postDeleteErr) {
                return done(postDeleteErr);
              }

              (postDeleteRes.body._id).should.equal(hospitalRegObj._id.toString());

              done();
            });
        });
    });
  });
  // HTTP PUT /api/posts/:postID

  afterEach(function (done) {
    User.remove().exec(function () {
      HospitalReg.remove().exec(done);
    });
  });
});

