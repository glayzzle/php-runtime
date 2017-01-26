/*!
 * Copyright (C) 2017 Glayzzle (BSD3 License)
 * @authors https://github.com/glayzzle/php-transpiler/graphs/contributors
 * @url http://glayzzle.com
 */
'use strict';
module.exports = function($php) {

  const PHP_ROUND_HALF_UP     = $php.constant('PHP_ROUND_HALF_UP');
  const PHP_ROUND_HALF_DOWN   = $php.constant('PHP_ROUND_HALF_DOWN');
  const PHP_ROUND_HALF_EVEN   = $php.constant('PHP_ROUND_HALF_EVEN');
  const PHP_ROUND_HALF_ODD    = $php.constant('PHP_ROUND_HALF_ODD');

  /**
   * http://php.net/manual/en/function.round.php
   * @url http://phpjs.org/functions/round/
   */
  $php.context.function.declare(
    '\\round', [
      {name: 'val', type: 'float'},
      {name: 'precision', type: 'int', default: 0},
      {name: 'mode', type: 'mode', default: PHP_ROUND_HALF_UP}
    ],
    'float', function round(value, precision, mode) {
      if (typeof precision === 'undefined') {
        precision = 0;
      }
      if (typeof mode === 'undefined') {
        mode = PHP_ROUND_HALF_UP;
      }
      var m, f, isHalf, sgn; // helper variables
      precision |= 0; // making sure precision is integer
      m = Math.pow(10, precision);
      value *= m;
      sgn = (value > 0) | -(value < 0); // sign of the number
      isHalf = value % 1 === 0.5 * sgn;
      f = Math.floor(value);

      if (isHalf) {
        switch (mode) {
          case PHP_ROUND_HALF_DOWN:
            value = f + (sgn < 0); // rounds .5 toward zero
            break;
          case PHP_ROUND_HALF_EVEN:
            value = f + (f % 2 * sgn); // rouds .5 towards the next even integer
            break;
          case PHP_ROUND_HALF_ODD:
            value = f + !(f % 2); // rounds .5 towards the next odd integer
            break;
          default:
            value = f + (sgn > 0); // rounds .5 away from zero
        }
      }
      return (isHalf ? value : Math.round(value)) / m;
    }
  );
};
