/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */

var extend = require('./extend');

// define default options
var defaults = {
  short_open_tag: false,
  output_buffering: 4096,
  implicit_flush: false,
  open_basedir: null,
  disable_functions: [],
  disable_classes: [],
  max_execution_time: 120,
  memory_limit: '128M',
  error_reporting: ['E_ALL'],
  display_errors: true,
  display_startup_errors: true,
  log_errors: true,
  log_errors_max_len: 1024,
  ignore_repeated_errors: false,
  ignore_repeated_source: false,
  track_errors: false,
  html_errors: false,
  error_log: '/var/log/php-error.log',
  include_path: ['.', '/usr/share/php'],
  enable_dl: false,
  allow_url_fopen: true,
  allow_url_include: false,
  // list of extensions
  extension: [],
  // http://php.net/date.timezone
  date: {
    timezone: "UTC",
    // http://php.net/date.default-latitude
    default_latitude: 31.7667,
    // http://php.net/date.default-longitude
    default_longitude: 35.2333,
    // http://php.net/date.sunrise-zenith
    sunrise_zenith: 90.583333,
    // http://php.net/date.sunset-zenith
    sunset_zenith: 90.583333
  }
};

/**
 * @constructor Config
 */
var Config = function(options) {
  if (options) {
    extend(this, defaults, options);
  } else {
    extend(this, defaults);
  }
};

/**
 * @todo ini_set
 */
Config.prototype.set = function(name, value) {

};

/**
 * @todo ini_get
 */
Config.prototype.get = function(name) {

};

/**
 * @todo php_info
 */
Config.prototype.info = function() {

};

module.exports = Config;
