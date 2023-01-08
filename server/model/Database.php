<?php

namespace model;
use PDO;

class Database {

    private array $config;
    private string $user;
    private string $password;

    public function __construct(array $config, string $user, string $password) {

        // Cannot use construct property promotion in PHP7

        $this->config = $config;
        $this->user = $user;
        $this->password = $password;

    }

    protected function getConnection(): PDO {

        $dsn = 'mysql:' . http_build_query($this->config, '', ';');

        return new PDO($dsn, $this->user, $this->password, [

            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_STRINGIFY_FETCHES => false

        ]);

    }

}