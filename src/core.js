/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';

/**
 * BAD DESIGN DISCLAIMER :
 * This class manage too much things (and will continue to grow)
 * until a day everything will the splitted ... need to implement
 * a prototype to grasp each concept and therefore will refactor
 * it in a clean code (it's bad and I know it)
 */

var path = require('path');
var fs = require('fs');
var extend = require('extend');

var Parser = require('php-parser');
var Transpiler = require('php-transpiler');

var Cache = require('./cache');
var Config = require('./config');

/**
 * @constructor Core
 */
var Core = function(options) {
  this.parser = new Parser({
    parser: {
      extractDoc: true
    },
    ast: {
      withPositions: true
    }
  });
  this.transpiler = new Transpiler({
    visitors: {},
    mode: 'body'
  });
  this.config = new Config();
  this.cache = new Cache();
  if (options) {
    extend(true, this, options);
  }
};

/**
 * Evaluate the specified code and returns its result
 * @return mixed
 */
Core.prototype.eval = function(code) {
  var fn = this.cache.getEval(code);
  if (!fn) {
    fn = new Function(
      '$php',
      this.transpiler.generate(
        this.parser.parseEval(code)
      )
    );
    this.cache.setEval(code, fn);
  }
  return fn;
};

/**
 * Resolves a filename
 */
Core.prototype.resolveFilename = function(filename) {
  // resolves the path with includes
  if (!path.isAbsolute(filename)) {
    if (filename in this.cache.stat.resolves) {
      // @fixme should flush it when changing includes
      return this.cache.stat.resolves[filename];
    }
    var includes = this.config.include_path;
    for(var i = 0; i < includes.length; i++) {
      var target = path.resolve(includes[i], filename);
      if (fs.existsSync(target)) {
        this.cache.stat.resolves[filename] = target;
        filename = target;
        break;
      }
    }
  }
  return filename;
}

/**
 * Includes the specified filename
 */
Core.prototype.include = function(filename) {
  filename = this.resolveFilename(filename);
  // load the callback
  var fn = this.cache.getScript(filename);
  if (!fn) {
    var code = fs.readFileSync(filename, {
      encoding: 'utf8'
    });
    fn = new Function(
      '$php',
      this.transpiler.generate(
        this.parser.parseCode(code, filename)
      )
    );
    this.cache.setScript(filename, fn);
  }
  // result response
  return {
    fn: fn,
    filename: filename
  };
};

// exports
module.exports = Core;
