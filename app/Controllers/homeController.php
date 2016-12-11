<?php

    /**
    * Home Controller
    */
    class Home extends Controller {
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