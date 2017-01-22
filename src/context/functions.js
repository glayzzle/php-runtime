/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';

var Fn = require('./reflection/function');

/**
 * Handles functions (from global context)
 * @constructor Functions
 */
var Functions = function(ctx) {
  this.items = {};
  this.ctx = ctx;
};

Functions.prototype.get = function(name) {

};

Functions.prototype.has = function(name) {

};

Functions.prototype.declare = function(name, fn, args, type) {

};

/**
 * Gets a function callback
 * @return {function}
 */
Functions.prototype.callback = function(name) {
  return this.get(name).get();
};

module.exports = Functions;
