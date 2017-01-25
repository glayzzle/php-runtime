/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';
module.exports = function($php) {

  // defines a list of message types
  const E_ERROR             = $php.constant('E_ERROR');
  const E_WARNING           = $php.constant('E_WARNING');
  const E_PARSE             = $php.constant('E_PARSE');
  const E_NOTICE            = $php.constant('E_NOTICE');
  const E_CORE_ERROR        = $php.constant('E_CORE_ERROR');
  const E_CORE_WARNING      = $php.constant('E_CORE_WARNING');
  const E_COMPILE_ERROR     = $php.constant('E_COMPILE_ERROR');
  const E_COMPILE_WARNING   = $php.constant('E_COMPILE_WARNING');
  const E_USER_ERROR        = $php.constant('E_USER_ERROR');
  const E_USER_WARNING      = $php.constant('E_USER_WARNING');
  const E_USER_NOTICE       = $php.constant('E_USER_NOTICE');
  const E_STRICT            = $php.constant('E_STRICT');
  const E_RECOVERABLE_ERROR = $php.constant('E_RECOVERABLE_ERROR');
  const E_DEPRECATED        = $php.constant('E_DEPRECATED');
  const E_USER_DEPRECATED   = $php.constant('E_USER_DEPRECATED');

  // defines the message errors
  let errorTypes = {};
  errorTypes[E_ERROR] = "Error";
  errorTypes[E_WARNING] = "Warning";
  errorTypes[E_PARSE] = "Parsing Error";
  errorTypes[E_NOTICE] = "Notice";
  errorTypes[E_CORE_ERROR] = "Core Error";
  errorTypes[E_CORE_WARNING] = "Core Warning";
  errorTypes[E_COMPILE_ERROR] = "Compile Error";
  errorTypes[E_COMPILE_WARNING] = "Compile Warning";
  errorTypes[E_USER_ERROR] = "User Error";
  errorTypes[E_USER_WARNING] = "User Warning";
  errorTypes[E_USER_NOTICE] = "User Notice";
  errorTypes[E_STRICT] = "Strict Notice";
  errorTypes[E_RECOVERABLE_ERROR] = "Recoverable fatal error";
  errorTypes[E_DEPRECATED] = "Deprecated";
  errorTypes[E_USER_DEPRECATED] = "Deprecated";

  // http://php.net/manual/fr/function.trigger-error.php
  $php.context.function.declare(
    '\\trigger_error', [
      {
        type: 'string',
        name: 'error_msg'
      },
      {
        type: 'int',
        name: 'error_type'
      }
    ],
    'bool', function trigger_error(error_msg, error_type) {
      if (typeof error_type === 'undefined') {
        error_type = E_USER_ERROR;
      }
      var msg = errorTypes[error_type];
      if (!msg) {
        return false;
      }
      // @fixme handle filename and line number from stack
      var errMsg = 'PHP ' + msg + ': ' + error_msg + ' in X on line X';
      // @fixme error_handler
      // @fixme handle errors output configuration
      // @todo handling error state
      $php.stderr.print(errMsg);
      // @todo error logger
      return true;
    }
  );

  /** register global functions **/
  $php.trigger_error = $php.context.function.callback('\\trigger_error');

};
