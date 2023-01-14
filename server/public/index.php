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

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

    // Handle preflight request
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: PATCH, DELETE');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;

}

header("application/x-www-form-urlencoded; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$parts = explode('/', $_SERVER["REQUEST_URI"]);

$database = new model\Database($config['database'], $config['user'][0], $config['password'][0]);

$mainController = new controller\Main($parts, $database);

$mainController->route();