/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';

var stream = require('stream');
var util = require('util');

var Stream = function(cb) {
  // @todo something great
  if (typeof cb === 'function') {
    this._cb = cb;
  }
};

Stream.prototype.print = function(data) {
  // quick & dirty tests
  this._cb(data);
};

Stream.prototype._cb = function(data) {
  throw new Error('Undefined output ressource');
};

module.exports = Stream;
