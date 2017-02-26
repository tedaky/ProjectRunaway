<?php

Config::set('site_name', 'Your Site Name');
Config::set('languages', array('en', 'fr'));

Config::set('routes', array(
    'default' => '',
    'admin' => 'admin',
    'test' => 'test'
));

Config::set('default_route', 'default');
Config::set('default_language', 'en');
Config::set('default_controller', 'home');
Config::set('default_action', 'index');

?>