<?php

namespace controller;

class Cart extends \model\Cart {

    private \model\Cart $gateway;

    public function __construct(\model\Cart $gateway) {

        // Cannot use construct property promotion in PHP7

        $this->gateway = $gateway;

    }

    public function processRequest(string $method, ?string $uid): void {

        if (empty($uid)) {

            echo json_encode(['error' => 'User is required']);
            return;

        }

        $cart = $this->gateway->get($uid);

        if ($cart === '') {

            http_response_code(404);
            echo json_encode(['message'=> 'Cart not found']);
            return;

        }

        switch ($method) {

            case 'GET':
                
                echo(json_encode($this->decodeCart($cart)));

                break;

            case 'POST':

                $data = $_POST;

                $errors = $this->getValidationErrors($data, true);

                if (! empty($errors)) {

                    http_response_code(422);

                    echo json_encode(['errors' => $errors]);

                    break;

                }

                if (!empty($data['new'])){

                    $rows = $this->gateway->update($this->translateCart($data['new'], $uid, 1), $uid);

                } else {

                    $rows = $this->gateway->update($this->translateCart($data['remove'], $uid, 0), $uid);

                }

                if ($rows === 0) {

                    http_response_code(500);

                    echo json_encode(['errors' => 'Something went wrong']);

                    break;

                }

                http_response_code(201);

                echo json_encode(['message' => 'Cart updated']);

                break;




            default:
            
                http_response_code(405);
                header('Allow: GET, POST');

        }

    }

    /*  The cart is saved in DB in the form of "X:X:X:X ... X:X" where all the X's are integers.
        Each X occupying an odd place refers to the id of a product in the cart,
        while the number adjacent to it to the right is its quantity.
        An empty cart is represented by a zero.   */

    private function translateCart(string $update, string $uid, bool $add): string {
        
        $old = $this->decodeCart($this->gateway->get($uid));
        $new = $old;
        if ($add) {

            if (isset($old[$update])) {

                ++$new[$update];

            } elseif (isset($old['cart']) && $old['cart'] === 'empty') {

                $new = [$update => "1"];

            } else {

                $new += [$update => "1"];
                ksort($new);

            }

        } else {

            if (isset($old[$update])) {

                --$new[$update];

                if ($new[$update] === 0) {

                    unset($new[$update]);

                }

            } elseif (isset($old['cart']) && $old['cart'] === 'empty') {

                return '0';

            }

        }

        return $this->encodeCart($new);

    }

    private function encodeCart(array $data): string {

        if ((isset($data['cart']) && $data['cart'] === 'empty') || empty($data)) {
            return '0';
        } 

        $foo = [];

        foreach ($data as $id => $number) {
            
            $foo[] = "$id:$number";

        }

        return implode(':', $foo);

    }

    private function decodeCart(string $data): array {

        if ($data === '0') {
            return ['cart' => 'empty'];
        }

        $foo1 = explode(':', $data);

        $foo2 = [];

        for ($i = 0; $i < (int) count($foo1)-1; $i += 2) {

            $foo2[$foo1[$i]] = $foo1[$i + 1];

        }

        return $foo2;

    }

    private function getValidationErrors(array $data): array {

        $errors = [];

        if (empty($data['new']) && empty($data['remove'])) {

            $errors[] = 'New data is required';

        }

        return $errors;

    }

}