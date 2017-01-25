/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';

var stream = require('stream');
var util = require('util');

var Stream = function() {
  // @todo something great
};

Stream.prototype.print = function(data) {
  // quick & dirty tests
  console.log(data);
};

module.exports = Stream;
