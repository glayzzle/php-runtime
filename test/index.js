/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';

var should = require('should');
var Runtime = require('../src/index');

describe('init', function() {
  it('should work', function() {
    var php = new Runtime();
  });
});
