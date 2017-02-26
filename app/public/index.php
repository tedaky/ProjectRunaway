<?php

define('DS', DIRECTORY_SEPARATOR);
define('ROOT', dirname(dirname(__FILE__)));

require_once(ROOT . DS . 'libs' . DS . 'init.php');

$uri = $_SERVER['REQUEST_URI'];

$router = new Router($uri);



$altoRouter = new AltoRouter();
$altoRouter->setBasePath('');
$altoRouter->map('GET','/', array('c' => 'HomeController', 'a' => 'Index'));
$altoRouter->map('GET|POST','/', 'home#index', 'home');
$altoRouter->map('GET','/users', array('c' => 'UserController', 'a' => 'ListAction'));
$altoRouter->map('GET','/users/[i:id]', 'users#show', 'users_show');
$altoRouter->map('POST','/users/[i:id]/[delete|update:action]', 'usersController#doAction', 'users_do');
// match current request
$match = $altoRouter->match();


?>
<pre>
<?php
print_r('Route: ' . $router->getRoute() . PHP_EOL);
print_r('Language: ' . $router->getLanguage() . PHP_EOL);
print_r('Controller: ' . $router->getController() . PHP_EOL);
print_r('Method: ' . $router->getMethodPrefix() . PHP_EOL);
print_r('Action: ' . $router->getAction() . PHP_EOL);
?>
Prams:
<?php
print_r($router->getParams());
?>

<?php
print_r($match . PHP_EOL);
print_r($altoRouter->getRoutes() . PHP_EOL);
?>