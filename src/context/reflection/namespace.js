/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';

var Namespace = function(name, parent) {
  this.parent = parent;
  this.name = name;
  this.children = {};
  this.functions = {};
  this.constants = {};
  this.classes = {};
  this.traits = {};
  this.interfaces = {};
};

module.exports = Namespace;