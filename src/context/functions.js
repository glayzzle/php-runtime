/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';

var Fn = require('./reflection/function');

/**
 * Handles functions (from global context)
 * @constructor Functions
 */
var Functions = function(context) {
  this.items = {};
  this.context = context;
};

Functions.prototype.get = function(name) {
  return this.items[name];
};

Functions.prototype.has = function(name) {

};

Functions.prototype.declare = function(name, args, type, fn) {

  // closure signature : (fn)
  if (typeof name === 'function') {
    fn = name;
    name = fn.name || '\\closure';
  }
  // signature : name, fn
  if (typeof args === 'function') {
    fn = args;
    args = [];
  }
  // defaults
  if (!args) args = [];
  if (!type) type = null;
  if (name[0] !== '\\') {
    name = '\\' + name;
  }
  // namespace resolution
  var nsPos = name.lastIndexOf('\\');
  var namespace = name.substring(0, nsPos + 1);
  var fnName = name.substring(nsPos + 1);
  // create instance
  var result = new Fn(fn, fnName, namespace);
  result.arguments = args;
  result.type = type;
  this.items[name] = result;
  return result;
};

/**
 * Gets a function callback
 * @return {function}
 */
Functions.prototype.callback = function(name) {
  if (name in this.items) {
    return this.items[name].fn;
  } else {
    var fn = function() {
      if (name in this.items) {
        console.log('late cb');
        fn = this.items[name].fn;
        return fn.apply(this, arguments);
      } else {
        throw new Error('Undefined function ' + name);
      }
    }.bind(this);
    return fn;
  }
};

module.exports = Functions;
