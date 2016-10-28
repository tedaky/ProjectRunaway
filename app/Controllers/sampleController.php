<?php

    /**
    * Sample Controller
    */
    class Sample {
        function __construct()
        {
            //echo("We are in the Sample Controller");
        }
        
        public function Index($value = "")
        {
            //echo("We are in Index " . $value);
            return include("../Views/Index.php");
        }
    }

?>