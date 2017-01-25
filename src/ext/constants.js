/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';
module.exports = function($php) {

  const E_NOTICE = $php.context.constant.get('E_NOTICE');
  const E_WARNING = $php.context.constant.get('E_WARNING');

  // http://php.net/manual/en/function.define.php
  $php.context.function.declare(
    '\\define', [
      {name: 'name', type: 'string'},
      {name: 'value', type: 'mixed'},
      {name: 'case_insensitive', type: 'bool', default: false}
    ],
    'bool', function define(name, value, case_insensitive) {
      if (case_insensitive) {
        name = name.toUpperCase();
      }
      if ($php.context.constant.has(name)) {
        $php.trigger_error(
          'Constant ' + name + ' is already defined', E_NOTICE
        );
        return false;
      }
      return $php.context.constant.set(name, value);
    }
  );

  // http://php.net/manual/en/function.defined.php
  $php.context.function.declare(
    '\\defined', [
      {name: 'name', type: 'string'}
    ],
    'bool', function defined(name) {
      return $php.context.constant.has(name, value);
    }
  );

  // http://php.net/manual/en/function.constant.php
  $php.context.function.declare(
    '\\constant', [
      {name: 'name', type: 'string'}
    ],
    'mixed', function constant(name) {
      var result = $php.context.constant.get(name);
      if (typeof result === 'undefined') {
        $php.trigger_error('Use of undefined constant '+name+' - assumed \''+name+'\'', E_NOTICE);
        return name;
      }
      return result;
    }
  );

  // http://php.net/manual/en/function.get-defined-constants.php
  $php.context.function.declare(
    '\\get_defined_constants', [
      {name: 'categorize', type: 'bool', default: false}
    ],
    'array', function defined(categorize) {
      var result = $php.array();
      var items = $php.context.constant.items;
      if (categorize) {
        var categories = {};
        for(var k in items) {
          var item = items[k];
          if (!result.isset(item.category)) {
            result.set(item.category) = $php.array();
          }
          result.get(item.category).set(k, item.value);
        }
      } else {
        for(var k in items) {
          result.set(k, items[k].value);
        }
      }
      return result;
    }
  );

  /** register global functions **/
  $php.constant = $php.context.function.callback('\\constant');


};
