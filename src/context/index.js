/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';

var Variables = require('./variables');
var Namespaces = require('./namespaces');
var Traits = require('./traits');
var Functions = require('./functions');
var Interfaces = require('./interfaces');
var Classes = require('./classes');
var Constants = require('./constants');

/**
 * Defines the global PHP context that contains
 * a list of informations
 * @constructor Context
 */
var Context = function() {
  this.loaders        = [];
  this.includes       = [];
  this.class          = new Classes(this);
  this.interface      = new Interfaces(this);
  this.trait          = new Traits(this);
  this.function       = new Functions(this);
  this.constant       = new Constants(this);
  this.variable       = new Variables(this);
  this.namespace      = new Namespaces(this);
  this.strictTypes    = false;
  this.isCoreLoading  = true;
  this.globals        = {};
};

/**
 * Reset the context, clear user defined :
 * - constants
 * - hooks
 * - globals
 * - functions
 * - classes / traits / interfaces
 * - namespaces
 */
Context.prototype.reset = function() {
  // @todo
  this.globals = {};
  this.loaders = [];
  this.includes = [];
};

/**
 * Declares an autoload function
 * @return {Boolean}
 */
Context.prototype.autoload = function(fn, prepend) {
  if (prepend) {
    this.loaders.unshift(fn);
  } else {
    this.loaders.push(fn);
  }
  return true;
};

module.exports = Context;
