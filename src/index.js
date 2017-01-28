/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';

var extend = require('./extend');
var Core = require('./core');
var Stream = require('./stream');
var Context = require('./context/index');
var phpArray = require('./array');


/**
 * @constructor Runtime
 */
var Runtime = function(options) {
  // the core engine
  this.core = new Core();
  // the context
  this.context = new Context();
  // custom / hack options
  if (options) {
    /**
    Sample :
{
  core: {
    config: {
      // PRODUCTION SETUP :
      error_log: 'syslog',
      display_errors: false,
      display_startup_errors: false,
      // CUSTOM EXTENSIONS :
      extension: ['glayzzle-common', 'glayzzle-mysqlnd', 'glayzzle-gd2']
    }
  }
}
    **/
    extend(this, options);
  }
  /** initialize streams **/
  this.stdout = new Stream(process.stdout.write);
  this.stderr = new Stream(process.stderr.write);
  this.context.isCoreLoading = true;
  /** registers core functions **/
  require('./ext/constants')(this);
  require('./ext/errors')(this);
  require('./ext/streams')(this);
  /** starts extensions **/
  var extensions = this.core.config.extension;
  for(var i = 0; i < extensions.length; i++) {
    require(extensions[i])(this);
  }
  /** ready to run **/
  this.context.isCoreLoading = false;
};

/**
 * Clean and reset the current context
 */
Runtime.prototype.reset = function(code) {
  this.context.reset();
};

/**
 * Run an eval over the specified PHP code
 */
Runtime.prototype.eval = function(code) {
  return this.core.eval(code)(this);
};

/**
 * Creates a new array instance
 */
Runtime.prototype.array = function() {
  return new phpArray(arguments);
};

/**
 * Run an inclusion over the specified filename
 */
Runtime.prototype.module = function(filename, once, required) {
  if (once) {
    // resolves filename before check
    filename = this.core.resolveFilename(filename);
    if (filename in this.context.includes) {
      return null;
    }
  }
  var result;
  // try to run the include
  try {
    result = this.core.include(filename);
    this.context.includes[result.filename] = true;
  } catch(e) {
    // generate an error
    var fnName = required ? 'require' : 'include';
    if (once) {
      fnName += '_once';
    }
    this.trigger_error(
      fnName + '(): Failed opening \'' + filename + '\' for inclusion (' +
      'include_path=\'' + this.core.config.include_path.join(':') + '\')',
      this.constant(required ? 'E_ERROR' : 'E_WARNING')
    );
    return null;
  }
  return result.fn(this);
};

/**
 * run a eval over the specified PHP code
 */
Runtime.prototype.include = function(filename) {
  return this.module(filename, false, false);
};

/**
 * includes the specified script only one time
 */
Runtime.prototype.include_once = function(filename) {
  return this.module(filename, true, false);
};

/**
 * requires the specified script and throws an error if its not found
 */
Runtime.prototype.require = function(filename) {
  return this.module(filename, false, true);
};

/**
 * require_once
 */
Runtime.prototype.require_once = function(filename) {
  return this.module(filename, true, true);
};

module.exports = Runtime;
