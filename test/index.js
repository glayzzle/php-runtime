/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';

var should = require('should');
var Parser = require('php-parser');
var Transpiler = require('php-transpiler');
var Runtime = require('../src/index');

describe('init', function() {
  it('should work', function() {
    var php = new Runtime();
    php.include(__dirname + '/fibo.php');


  });
});
