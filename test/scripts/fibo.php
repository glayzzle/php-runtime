<?php
//declare(strict_types=1);
namespace foo\bar {
  /**
   * The famous fibonnaci benchmark to test function calls
   */
  function fibo(int $a) : int {
  //function fibo($a) {
    // return $a < 1 ? 1 : fibo($a - 2) + fibo($a - 1);
    if ($a < 2) {
      return $a; /* here */
    }
    return fibo($a - 2) + fibo($a - 1);
  }
  $start = microtime(true);
  echo fibo(28) . "\n";
  echo "Duration " . round(microtime(true) - $start, 3) . "sec\n";
}

namespace {
  echo "Hello world\n\n";
  $a = 1;
  $b = 2;
  $c = $a + $b;
}
