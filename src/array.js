/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';

var phpArray = function Array(items) {
  this.items = {};
  this.properties = [];
  this.length = 0;
  this.index = 0;
  // initialize the array with initial array (a real one !)
  if (items) {
    for(var i = 0; i < items.length; i++) {
      this.items[i] = [items[i], i];
      this.properties.push(i);
    }
    this.index = items.length;
    this.length = items.length;
  }
};

phpArray.prototype.push = function(data) {
  return this.set(this.index, data);
};

phpArray.prototype.pop = function() {
  var last = this.properties.pop();
  var value = this.items[last][0];
  delete this.items[last];
  this.length --;
  if (!isNaN(last)) {
    this.index --;
  }
  return value;
};

phpArray.prototype.shift = function() {
  var first = this.properties.shift();
  var value = this.items[first][0];
  delete this.items[first];
  this.length --;
  return value;
};

/**
 * @todo need a way to improve it's performance
 */
phpArray.prototype.unshift = function() {
  // silly method, reindex all numbers into the array
  // alot of writes
};

phpArray.prototype.set = function(key, data) {
  var numKey = parseInt(key, 10);
  if (!isNaN(numKey)) {
    key = numKey;
    if (!(key in this.items)) {
      this.index = numKey + 1;
    }
  }
  if (!(key in this.items)) {
    this.items[key] = [data, this.properties.length];
    this.properties.push(key);
    this.length ++;
  } else {
    this.items[key][0] = data;
  }
  return true;
};

phpArray.prototype.get = function(key) {
  return this.items[key][0];
};

phpArray.prototype.isset = function(key) {
  return key in this.items;
};

phpArray.prototype.unset = function(key) {
  if (key in this.items) {
    this.properties.splice(this.items[key][1], 1);
    delete this.items[key];
    this.length --;
    return true;
  }
  return false;
};

module.exports = phpArray;
