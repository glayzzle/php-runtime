/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';

var md5 = require('crypto').createHash('md5');
var version = require('../package.json').version;

var Cache = function(path) {
  this.evals = {};
  this.scripts = {};
  this.stat = {
    resolves: {},
    items: {}
  };
  this.path = path;
};

/**
 * Resolves a cache filename
 */
Cache.prototype.resolve = function(key) {
  var fPos = key.lastIndexOf('/');
  if (fPos === -1) {
    fPos = key.lastIndexOf('\\');
  }
  var prefix = version + '-' + md5.update(key).digest('hex');
  if (fPos > 0) {
    return prefix + '-' + key.substring(fPos + 1) + '.js';
  } else {
    return prefix + '.js';
  }
};

/**
 * Gets the evaluation callback
 */
Cache.prototype.getEval = function(code) {
  if (code in this.evals) {
    return this.evals[code];
  }
};

/**
 * Stores an evaluation callback
 */
Cache.prototype.setEval = function(code, fn) {
  this.evals[code] = fn;
};

/**
 * Resolves a script
 */
Cache.prototype.getScript = function(filename) {
  if (filename in this.scripts) {
    return this.scripts[filename];
  }
  if (this.path) {
    // retrieve the file from cache (if exists)
  }
};

/**
 * Stores a script
 */
Cache.prototype.setScript = function(filename, fn) {
  this.scripts[filename] = fn;
  if (this.path) {
    // stores the file to cache
  }
};

// exports the cache module
module.exports = Cache;
