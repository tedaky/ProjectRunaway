<?php

    /**
    * Sample Controller
    */
    class Sample extends Controller {
        function __construct()
        {
            parent::__construct();
        }
        
        public function Index($value = '')
        {
            $this->view->render('index');
        }
    }

?>