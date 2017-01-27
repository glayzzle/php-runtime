/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';

module.exports = function extend() {
  var result = arguments[0];
  for(var i = 1; i < arguments.length; i++) {
    var opt = arguments[i];
    if (Array.isArray(opt)) {
      if (!Array.isArray(result)) {
        result = opt;
      } else {
        for(var i = 0; i < opt.length; i++) result.push(opt[i]);
      }
    } else {
      for(var k in opt) {
        if (!(k in result)) {
          result[k] = opt[k];
        } else {
          if (typeof opt[k] === 'object') {
            extend(result[k], opt[k]);
          } else {
            result[k] = opt[k];
          }
        }
      }
    }
  }
  return result;
}
