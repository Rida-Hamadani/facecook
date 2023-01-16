<?php

namespace controller;

class Product extends \model\Product {

    private \model\Product $gateway;

    public function __construct(\model\Product $gateway) {

        // Cannot use construct property promotion in PHP7

        $this->gateway = $gateway;

    }

    public function processRequest(string $method, ?string $id): void {

        if ($id === 'featured') {

            $this->processFeaturedRequest($method);

        } elseif ($id) {

            $this->processResourceRequest($method, $id);

        } else {

            $this->processCollectionRequest($method);

        }

    }

    private function processFeaturedRequest(string $method): void {

        switch($method) {

            case 'GET':

                echo(json_encode($this->gateway->getFeatured()));

                break;

            default:

                http_response_code(405);

                header("Allow: GET");
        }

    }

    private function processResourceRequest(string $method, string $id): void {

        $product = $this->gateway->get($id);

        if ($product === []) {

            http_response_code(404);
            echo json_encode(['message'=> 'Product not found']);
            return;

        }

        switch ($method) {

            case 'GET':
                
                echo(json_encode($product));

                break;

            default:
            
                http_response_code(405);
                header('Allow: GET');

        }

    }

    private function processCollectionRequest(string $method): void {

        switch($method) {

            case 'GET':

                echo(json_encode($this->gateway->getAll()));

                break;

            default:

                http_response_code(405);

                header("Allow: GET");
        }

    }

    private function getValidationErrors(array $data, bool $required): array {

        $errors = [];

        if ($required) {

            foreach (['name', 'description', 'cost'] as $item) {

                if (empty($data[$item])) {

                    $errors[] = $item . ' is required';

                }

            }

        }
        
        if (array_key_exists('cost', $data)) {

            if (filter_var($data['cost'], FILTER_VALIDATE_INT) === false) {
                
                $errors[] = 'cost must be an integer';

            }

        }

        if (array_key_exists('featured', $data)) {

            if (filter_var($data['featured'], FILTER_VALIDATE_BOOL) === false) {
                
                $errors[] = 'featured must be a boolean';

            }

        }

        return $errors;

    }

}