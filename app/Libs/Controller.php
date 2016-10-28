<?php

    if(isset($_GET['url'])) {
        $url = $_GET['url'];
    } else {
        $url = $_SERVER["REQUEST_URI"];
    }
    
    $url = ltrim(rtrim($url, "/"), "/");

    if($url == "") {
        $url = "sample";
    }
    
    $url = explode("/", $url);
    
    $controllerFile = "../Controllers/". $url[0] . "Controller.php";
    if(file_exists($controllerFile)) {
    } else {
        $url = "somethingwentwrong";
        $url = explode("/", $url);
    }
    
    require_once("../Controllers/" . $url[0] . "Controller.php");
    $controller = new $url[0];

    if (isset($url[2])) {
        $controller->{$url[1]}($url[2]);
    }
    else {
        if (isset($url[1])) {
            $controller->{$url[1]}();
        } else {
            $controller->{"Index"}();
        }
    }

?>