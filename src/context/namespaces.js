/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';

var Namespace = require('./reflection/namespace');

/**
 * Handles namespaces
 * @constructor Variables
 */
var Namespaces = function() {
  this.root = new Namespace('', '', null);
  this.current = this.root;
  this.items = {
    '\\': this.root
  };
};

/**
 * gets or creates a namespace
 * @return {Namespace}
 */
Namespaces.prototype.get = function(name) {
  if (name[0] !== '\\') name = '\\' + name;
  if (name in this.items) {
    return this.items[name];
  }
  // build the namespace tree
  name = name.split('\\');
  var prefix = '';
  var item  = this.root;
  for(var i = 1; i < name.length; i++) {
    var child = name[i];
    prefix += '\\' + child;
    if (!(child in item.children)) {
      item.children[child] = new Namespace(child, prefix, item);
      this.items[prefix] = item.children[child];
    }
    item = item.children[child];
  }
  return item;
};

/**
 * Sets the current namespace
 * @return {Namespace}
 */
Namespaces.prototype.use = function(name) {
  if (!name) {
    this.current = this.root;
  } else {
    this.current = this.get(name);
  }
  return this.current;
};

/**
 * Checks if the namespace is defined
 */
Namespaces.prototype.has = function(name) {
  if (name[0] !== '\\') name = '\\' + name;
  return name in this.items;
};

module.exports = Namespaces;
