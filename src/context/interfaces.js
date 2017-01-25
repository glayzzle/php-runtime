/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';

/**
 * Handles interfaces (from global context)
 * @constructor Interfaces
 */
var Interfaces = function(ctx) {
  this.items = {};
  this.ctx = ctx;
};

module.exports = Interfaces;
