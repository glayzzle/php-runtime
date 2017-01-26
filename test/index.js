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
  // PRODUCTION SETUP :
  var php = new Runtime({
    core: {
      config: {
        error_log: 'syslog',
        //display_errors: false,
        //display_startup_errors: false,
        extension: [
          'glayzzle-mysqlnd',
          'glayzzle-pdo',
          'glayzzle-pdo-mysql'
        ]
      }
    }
  });

  it('should work', function() {
    php.include(__dirname + '/fibo.php');
    php.include(__dirname + '/loop.php');
  });
});
