<?php

    /**
    * Error Controller
    */
    class SomethingWentWrong extends Controller {
        function __construct()
        {
            parent::__construct();
        }
        
        public function Index($value = '')
        {
            header('HTTP/1.0 404 Not Found');

            $this->view->render('error/index');
        }
    }

?>