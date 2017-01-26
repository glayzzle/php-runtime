/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';
module.exports = function($php) {
  var datetime = require('locutus/php/datetime');
  /**
   * http://php.net/manual/en/function.microtime.php
   */
  $php.context.function.declare(
    '\\microtime', [
      {name: 'get_as_float', type: 'bool', default: false}
    ],
    'mixed', datetime.microtime
  );
  /**
   * http://php.net/manual/en/function.date.php
   */
  $php.context.function.declare(
    '\\date', [
      {name: 'format', type: 'string'},
      {name: 'int', type: 'timestamp', default: 'expr:time()'},
    ],
    'string', datetime.date
  );
  /**
   * http://php.net/manual/en/function.time.php
   */
  $php.context.function.declare(
    '\\time', [],
    'int', datetime.time
  );
};
