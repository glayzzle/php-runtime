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
  if (name[0] !== '\\') name = '\\' + name;
  return this.items[name];
};

Functions.prototype.has = function(name) {
  if (name[0] !== '\\') name = '\\' + name;
  return name in this.items;
};

/**
 * Declares an async function
 */
Functions.prototype.async = function(name, args, type, fn) {
  var func = this.declare(name, args, type, fn);
  func.fn = function() {
    var ctx = this;
    var args = Array.prototype.slice.call(arguments, 1);

  };
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
    name = this.context.namespace.current.fullName + '\\' + name;
  }
  // namespace resolution
  var nsPos = name.lastIndexOf('\\');
  var namespace = name.substring(0, nsPos + 1);
  var fnName = name.substring(nsPos + 1);
  // create instance
  var result = new Fn(fn, fnName);
  result.arguments = args;
  result.type = type;
  this.items[name] = result;
  // attach to namespace
  var namespace = this.context.namespace.get(namespace);
  namespace.functions[fnName] = result;
  result.namespace = namespace;
  return result;
};

/**
 * Gets a function callback
 * @return {function}
 */
Functions.prototype.callback = function(name, lookup, jit) {
  if (name[0] !== '\\') name = '\\' + name;
  if (name in this.items) {
    // bingo !
    return this.items[name].fn;
  } else {
    var self = this;
    var fn = function() {
      if (!(name in self.items) && lookup) {
        // try root namespace
        name = name.substring(name.lastIndexOf('\\'));
      }
      if (name in self.items) {
        fn = self.items[name].fn;
        jit(fn);
        return fn.apply(self, arguments);
      } else {
        throw new Error('Undefined function ' + name);
      }
    };
    return fn;
  }
};

module.exports = Functions;
