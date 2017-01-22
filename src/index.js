/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';

var Parser = require('php-parser');
var Transpiler = require('php-transpiler');


/**
 * @constructor Runtime
 */
var Runtime = function(options) {
  if (options) {
    for(var k in options) {
      this[k] = options;
    }
  }
  if (!this.parser) {
    this.parser = new Parser({
      parser: {

      }
    });
  }
};

module.exports = Runtime;
