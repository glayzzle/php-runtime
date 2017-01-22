/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';

var Trait = function(name, namespace) {
  this.extends = null;
  this.public = {};
  this.protected = {};
  this.private = {};
  this.static = {
    public: {},
    protected: {},
    private: {},
    constant: {}
  };
};

module.exports = Trait;
