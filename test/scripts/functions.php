<?php

  $items = get_defined_functions();
  $items = $items['internal'];
  // print_r($items);
  foreach($items as $name) {
    echo $name . ' ( ';
    $ref = new ReflectionFunction($name);
    $params = $ref->getParameters();
    foreach($params as $arg) {
      $type = $arg->getType();
      if ($type) {
        $type = $type->__toString();
      } else if ($arg->isArray()) {
        $type = 'array';
      } else if ($arg->isCallable()) {
        $type = 'callable';
      } else {
        $type = 'mixed';
      }
      echo $arg->name . ':' . $type . '; ';
    }
    $return = $ref->getReturnType();
    if ($return) {
      echo ") => ".$return->__toString()."\n";
    } else {
      echo ") => ??\n";
    }
  }
