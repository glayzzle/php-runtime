/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';

/**
 * Defines a function structure
 */
var Function = function(fn, name, namespace) {
  this.fn = fn;
  this.name = name || 'closure';
  this.namespace = namespace || '\\';
  this.arguments = [];
  this.type = null;
};

/**
 * Gets callback entry
Function.prototype.get = function() {
  return this.call.bind(this);
};
*/

/**
 * Make a call to the specified function
Function.prototype.call = function(context, args) {
  var result = this.fn.apply(context, args);
  if (this.type) {
    switch(this.type) {
      case 'integer':
        if (typeof result !== 'number') {
          // @todo
        }
        break;
    }
  }
  return result;
};
*/

module.exports = Function;
