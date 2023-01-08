<?php

namespace controller;

class LogIn extends \model\LogIn {

    private \model\LogIn $gateway;
    private string $uid;
    private string $pwd;

    public function __construct(string $uid, string $pwd, \model\LogIn $gateway) {
        
        // Cannot use construct property promotion in PHP7

        $this->gateway = $gateway;
        $this->uid = $uid;
        $this->pwd = $pwd;

    }

    public function logInUser(): void {

        if (! empty($errors)) {

            http_response_code(400);

            echo json_encode(['errors' => $errors]);

            exit();

        }

        $flag = $this->gateway->getUser($this->uid, $this->pwd);

        switch ($flag){

            case -1:

                http_response_code(401);

                echo json_encode(['errors'=>['Incorrect username']]);

                break;

            case 0:

                http_response_code(403);

                echo json_encode(['errors'=>['Incorrect password']]);

                break;
            
            default:

                break;

        }

    }

    private function getValidationErrors(): array {

        $errors = [];

        $data = ['Username' => $this->uid, 
                'Password' => $this->pwd];

        foreach ($data as $key => $value) {

            if (empty($value)) {

                $errors[] = $key . ' is required';

            }

        }

        return $errors;

    }


}