<?php

namespace controller;
use model\Database;

class Main {

    private Database $database;
    private array $parts;

    public function __construct(array $parts, Database $database) {
        
        // Cannot use construct property promotion in PHP7

        $this->database = $database;
        $this->parts = $parts;

    }

    public function route() {

        switch($this->parts[1]){

        case 'products':

            $id = $this->parts[2] ?? null;

            $productGateway = new \model\Product($this->database);

            $productController = new \controller\Product($productGateway);

            $productController->processRequest($_SERVER['REQUEST_METHOD'], $id);

            break;

        case 'login':

            if (isset($_POST['submit'])) {

                // Grab the data and instantiate the log in controller

                $uid = $_POST['uid'];
                $pwd = $_POST['pwd'];

                $logInGateway = new \model\LogIn($this->database);

                $logInController = new \controller\LogIn($uid, $pwd, $logInGateway);

                // User log in with error handling

                $logInController->logInUser();

            }
            
            break;

            case 'signup':

                if (isset($_POST['submit'])) {

                    // Grab the data and instantiate the sign up controller

                    $uid = $_POST['uid'];
                    $pwd = $_POST['pwd'];
                    $pwdRepeat = $_POST['pwdRepeat'];
                    $email = $_POST['email'];

                    $signUpGateway = new \model\SignUp($this->database);

                    $signUpController = new \controller\SignUp($uid, $pwd, $pwdRepeat, $email, $signUpGateway);

                    // User sign up with error handling

                    $signUpController->signUpUser();

                }

                break;

        default:

            http_response_code(404);
            exit;

        }

    }

}