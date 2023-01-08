<?php

namespace controller;

class SignUp extends \model\SignUp {

    private string $uid;
    private string $pwd;
    private string $pwdRepeat;
    private string $email;

    public function __construct(string $uid, string $pwd, string $pwdRepeat, string $email) {
        
        // Cannot use construct property promotion in PHP7

        $this->uid = $uid;
        $this->pwd = $pwd;
        $this->pwdRepeat = $pwdRepeat;
        $this->email = $email;

    }

    public function signUpUser(): void {

        if (! empty($errors)) {

            http_response_code(400);

            echo json_encode(['errors' => $errors]);

            exit();

        }

        $this->setUser($this->uid, $this->pwd, $this->email);

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

        if (! filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            
            $errors[] = 'Invalid email address';

        }

        if ($this->pwd !== $this->pwdRepeat) {

            $errors[] = 'Passwords do not match';

        }

        if ($this->isUidTaken()) {

            $errors[] = 'Username taken';

        }

        if ($this->isEmailTaken()) {

            $errors[] = 'E-mail already registered';

        }

        return $errors;

    }


}