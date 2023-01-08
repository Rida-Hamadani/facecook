<?php

declare(strict_types = 1);

const BASE_PATH = __DIR__ . '/../';

spl_autoload_register(function ($class) {
    $class = str_replace('\\', DIRECTORY_SEPARATOR, $class);
    require BASE_PATH . "$class.php";
});

// Error and exception handling

set_error_handler("model\ErrorHandler::handleError");
set_exception_handler("model\ErrorHandler::handleException");

$config = require(BASE_PATH . 'include/config.php');

// Headers

header('Content-type: application/json; charset=UTF-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$parts = explode('/', $_SERVER["REQUEST_URI"]);

if (! in_array($parts[1], ['products', 'login'])) {
    http_response_code(404);
    exit;
}

$database = new model\Database($config['database'], $config['user'][0], $config['password'][0]);

if ($parts[1] === 'products') {

$id = $parts[2] ?? null;

$productGateway = new model\Product($database);

$productController = new controller\Product($productGateway);

$productController->processRequest($_SERVER['REQUEST_METHOD'], $id);
}

if ($parts[1] === 'login') {
if (isset($_POST['submit'])) {

    // Grab the data and instantiate the log in controller

    $uid = $_POST['uid'];
    $pwd = $_POST['pwd'];

    $logInGateway = new model\LogIn($database);

    $logInController = new controller\LogIn($uid, $pwd, $logInGateway);

    // User log in with error handling

    $logInController->logInUser();

}}