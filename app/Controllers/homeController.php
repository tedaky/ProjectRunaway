<?php

    /**
    * Home Controller
    */
    class Home {
        function __construct()
        {
            echo("We are in the Home Controller");
        }
        
        public function Index($value = "")
        {
            echo("We are in Index " . $value);
        }
    }

?>