/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';

var Interface = function(name, namespace) {
  this.name = name;
  this.namespace = namespace;
  this.extends = null;
  this.public = {};
  this.protected = {};
  this.static = {
    public: {},
    protected: {},
    constant: {}
  };
};

module.exports = Interface;
