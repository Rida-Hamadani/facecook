<?php

namespace controller;

class Review extends \model\Review {

    private \model\Review $gateway;

    public function __construct(\model\Review $gateway) {

        // Cannot use construct property promotion in PHP7

        $this->gateway = $gateway;

    }

    public function processRequest(string $method, ?string $product, ?string $id): void {

        if (empty($product)) {

            echo(json_encode(['errors'=> 'Product is required']));
            return;

        }

        if ($id) {

            $this->processResourceRequest($method, $product, $id);

        } else {

            $this->processCollectionRequest($method, $product);

        }

    }

    private function processResourceRequest(string $method, string $product, string $id): void {

        $review = $this->gateway->get($id);

        if ($review === []) {

            http_response_code(404);
            echo json_encode(['message'=> 'Review not found']);
            return;

        }

        switch ($method) {

            case 'PATCH':

                parse_str(file_get_contents('php://input'), $_PATCH);
                $data = $_PATCH;

                $errors = $this->getValidationErrors($data, false);

                if (! empty($errors)) {

                    http_response_code(422);

                    echo json_encode(['errors' => $errors]);

                    break;

                }

                $rows = $this->gateway->update($review, $product, $data);

                echo json_encode([

                    'review' => "Review $id updated",
                    'rows' => $rows
                    
                ]);

                break;

            case 'DELETE':

                $rows = $this->gateway->delete($id);

                echo json_encode([

                    'message' => "Review $id deleted",
                    'rows' => $rows

                ]);

                break;

            default:
            
                http_response_code(405);
                header('Allow: PATCH, DELETE');

        }

    }

    private function processCollectionRequest(string $method, string $product): void {

        switch($method) {

            case 'GET':

                $data = $this->gateway->getAll($product);

                if (empty($data)) {

                    echo json_encode(['messages' => 'no reviews']);

                    exit;

                } else {

                    echo json_encode($data);

                }

                break;

            case 'POST':

                $data = $_POST;
                $errors = $this->getValidationErrors($data, true);

                if (! empty($errors)) {

                    http_response_code(422);

                    echo json_encode(['errors' => $errors]);

                    break;

                }

                $id = $this->gateway->create($data, $product);

                http_response_code(201);

                echo json_encode([
                    'message' => 'Review created',
                    'id' => $id
                ]);

                break;

            default:

                http_response_code(405);

                header("Allow: GET, POST");

        }

    }

    private function getValidationErrors(array $data, bool $required): array {

        $errors = [];

        if ($required) {

            foreach (['title', 'body', 'stars', 'uid'] as $item) {

                if (empty($data[$item])) {

                    $errors[] = $item . ' is required';

                }

            }

        }

        if (array_key_exists('stars', $data)) {

            if (filter_var($data['stars'], FILTER_VALIDATE_INT) === false) {
                
                $errors[] = 'stars must be an integer';

            }

            if ($data['stars'] < 1 || $data['stars'] > 5) {

                $errors[] = 'stars must be between 1 and 5';

            }

        }

        if (array_key_exists('title', $data) && strlen($data['title']) > 100) {

            $errors[] = 'title must be less than 100 characters.';

        }

        if (array_key_exists('body', $data) && strlen($data['body']) > 1000) {

            $errors[] = 'body must be less than 1000 characters.';

        }

        return $errors;

    }

}