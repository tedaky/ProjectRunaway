<?php

    /**
    * Error Controller
    */
    class SomethingWentWrong {
        function __construct()
        {
            header("HTTP/1.0 404 Not Found");
        }
        
        public function Index($value = "")
        {
            return include("../Views/index.php");
        }
    }

?>