<?php

namespace controller;

class SignUp extends \model\SignUp {

    private \model\SignUp $gateway;
    private string $uid;
    private string $pwd;
    private string $pwdRepeat;
    private string $email;

    public function __construct(string $uid, string $pwd, string $pwdRepeat, string $email, \model\SignUp $gateway) {
        
        // Cannot use construct property promotion in PHP7

        $this->gateway = $gateway;
        $this->uid = $uid;
        $this->pwd = $pwd;
        $this->pwdRepeat = $pwdRepeat;
        $this->email = $email;

    }

    public function signUpUser(): void {

        $errors = $this->getValidationErrors();

        if (! empty($errors)) {

            http_response_code(400);

            echo json_encode(['errors' => $errors]);

            exit();

        }

        $flag = $this->gateway->setUser($this->uid, $this->pwd, $this->email);

        switch($flag){

            case 0:

                http_response_code(500);

                echo json_encode(['errors'=>['Something went wrong']]);

                break;
            
            default:

                echo json_encode(['messages'=>['Success']]);

                break;

        }

    }

    private function getValidationErrors(): array {

        $errors = [];

        $data = ['Username' => $this->uid, 
                'E-mail' => $this->email, 
                'Password' => $this->pwd, 
                'Repeating password' => $this->pwdRepeat];

        foreach ($data as $key => $value) {

            if (empty($value)) {

                $errors[] = $key . ' is required';

            }

        }

        if (! preg_match("/^[a-zA-Z0-9_]*$/", $this->uid)) {
            
            $errors[] = 'Username can only contain letters, numbers, or underscores';

        }

        if (! preg_match("/^[a-zA-Z0-9_]*$/", $this->uid)) {
            
            $errors[] = 'Username can only contain letters, numbers, or underscores';

        }

        if (strlen($this->uid) < 5 || strlen($this->uid) > 16) {
            
            $errors[] = 'Username must contain between 5 and 16 characters';

        }

        if (! preg_match('/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/', $this->pwd)) {

            $errors[] = 'Password must contain at least one number and one letter';

        }

        if (strlen($this->pwd) < 8 || strlen($this->pwd) > 25) {
            
            $errors[] = 'Password must contain between 8 and 25 characters';

        }

        if (! filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            
            $errors[] = 'Invalid email address';

        }

        if ($this->pwd !== $this->pwdRepeat) {

            $errors[] = 'Passwords do not match';

        }

        if ($this->gateway->isUidTaken($this->uid)) {

            $errors[] = 'Username taken';

        }

        if ($this->gateway->isEmailTaken($this->email)) {

            $errors[] = 'E-mail already registered';

        }

        return $errors;

    }


}