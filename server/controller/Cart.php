<?php

namespace controller;

class Cart extends \model\Cart {

    private \model\Cart $gateway;

    public function __construct(\model\Cart $gateway) {

        // Cannot use construct property promotion in PHP7

        $this->gateway = $gateway;

    }

    public function processRequest(string $method, string $iud): void {

        $cart = $this->gateway->get($iud);

        if ($cart === '') {

            http_response_code(404);
            echo json_encode(['message'=> 'Cart not found']);
            return;

        }

        switch ($method) {

            case 'GET':
                
                echo(json_encode($this->decodeCart($cart)));

                break;

            case 'PUT':

                $data = (array) json_decode(file_get_contents('php://input'), true);
                $errors = $this->getValidationErrors($data, true);

                if (! empty($errors)) {

                    http_response_code(422);

                    echo json_encode(['errors' => $errors]);

                    break;

                }

                $rows = $this->gateway->update($this->encodeCart($data['new']), $iud);

                if ($rows === 0) {

                    http_response_code(500);

                    echo json_encode(['errors' => 'Something went wrong']);

                    break;

                }

                http_response_code(201);

                echo json_encode(['message' => 'Cart created']);

                break;




            default:
            
                http_response_code(405);
                header('Allow: GET, PUT');

        }

    }

    private function encodeCart(array $data): string {

        if ($data['new'] = 'empty') {
            return '0';
        } 

        $foo = [];

        foreach ($data as $key => $value) {

            $foo[] = "$key:$value";

        }
        
        return http_build_query($foo, '', ':');

    }

    private function decodeCart(string $data): array {

        if ($data === '0') {
            return ['cart' => 'empty'];
        }

        $foo1 = explode(':', $data);

        $foo2 = [];

        for ($i = 0; $i <= (int) floor(count($foo1) / 2); $i += 2) {
            
            $foo2[] = [$foo1[$i] => $foo1[$i+1]];

        } 
        
        return $foo2;

    }

    private function getValidationErrors(array $data): array {

        $errors = [];

        if (!$data['new']) {

            $errors[] = 'New data is required';

        }

        return $errors;

    }

}