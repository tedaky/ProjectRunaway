<?php

/**
 * 
 */
class Config {

    protected static $settings = array();

    /**
     * @param string $key
     * @return @mixed|null
     */
    public static function get($key) {
        return isset(self::$settings[$key]) ? self::$settings[$key] : null;
    }
    
    /**
     * @param string $key
     * @param string $value
     */
    public static function set($key, $value) {
        self::$settings[$key] = $value;
    }

    function __construct() {
    }
}


?>