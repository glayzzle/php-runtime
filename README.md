# php-runtime

Lightweight runtime that using [php-parser](https://github.com/glayzzle/php-parser) and [php-transpiler](https://github.com/glayzzle/php-transpiler) in order to execute php code.

[![npm version](https://badge.fury.io/js/php-runtime.svg)](https://www.npmjs.com/package/php-runtime)
[![Build Status](https://travis-ci.org/glayzzle/php-runtime.svg?branch=master)](https://travis-ci.org/glayzzle/php-runtime)
[![Coverage Status](https://coveralls.io/repos/github/glayzzle/php-runtime/badge.svg?branch=master)](https://coveralls.io/github/glayzzle/php-runtime?branch=master)
[![Gitter](https://img.shields.io/badge/GITTER-join%20chat-green.svg)](https://gitter.im/glayzzle/Lobby)

Installation
------------

This library is distributed with [npm](https://www.npmjs.com/package/php-runtime) :

```sh
npm install php-runtime --save
```

Usage
-----

```js
var Runtime = require('php-runtime');
var php = new Runtime({
  core: {
    config: {

    }
  }
});
// starts to execute :
php.include(__dirname + '/index.php');
```

# Core functions

I wanted to keep this package light and focus only on runtime functions.

In order to use common php functions / constants you should use [php-core](https://github.com/glayzzle/php-core) package.

```
npm install php-core --save
```

And initialize its dependency :

```js
var Runtime = require('php-runtime');
var php = new Runtime({
  core: {
    config: {
      extensions: ['php-core']
    }
  }
});
// starts to execute :
php.include(__dirname + '/index.php');
```

# Misc

This library is released under BSD-3 license clause.
