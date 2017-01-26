/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';
module.exports = function($php) {
  /**
   * This function is just to test async emulation & benchmark it
   * http://php.net/manual/en/function.file-get-contents.php
   */
  $php.context.function.declare(
    '\\file_get_contents', [
      {name: 'filename', type: 'string'},
      {name: 'use_include_path', type: 'bool', default: false}
      // ...etc...
    ],
    'string', function file_get_contents(filename, use_include_path) {
      if (use_include_path) {
        // @todo tadaaa !
      }
    }
  );
});
