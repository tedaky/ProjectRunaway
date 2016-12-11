<?php

    /**
    * View
    */
    class View {
        function __construct() {
        }
        
        public function render($name = '') {
            require('../Views/' . $name . '.php');
        }
    }

?>