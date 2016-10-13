'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * HospitalReg Schema
 */
var HospitalRegSchema = new Schema({
  // HospitalReg model fields
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Hospital name cannot be blank'
  },
  address: {
    street1: {
      type: String,
      default: '',
      trim: true
    },
    street2: {
      type: String,
      default: '',
      trim: true
    },
    city: {
      type: String,
      default: '',
      trim: true
    },
    locality: {
      type: String,
      default: '',
      trim: true
    },
    state: {
      type: String,
      default: '',
      trim: true
    },
    pinCode: {
      type: String,
      default: '',
      trim: true
    }
  },
  landMark: {
    type: String,
    default: '',
    trim: true
  },
  phone: {
    type: String,
    default: '',
    trim: true
  },
  contact: {
    name: {
      type: String,
      default: '',
      trim: true
    },
    email: {
      type: String,
      default: '',
      trim: true
    },
    phone: {
      type: String,
      default: '',
      trim: true
    },
    timing: {
      type: String,
      default: '',
      trim: true
    }
  },
  numberOfDoctors: {
    type: String,
    default: '',
    trim: true
  },
  activated: {
    type: Boolean,
    default: false
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('HospitalReg', HospitalRegSchema);
