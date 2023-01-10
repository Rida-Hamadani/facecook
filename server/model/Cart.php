<?php

namespace model;
use model\Database;
use PDO;

class Cart extends Database {

    private PDO $connection;

    public function __construct(Database $database) {
        $this->connection = $database->getConnection();
    }

    protected function get(string $uid): string {

        $sql = "SELECT cart 
                FROM users
                WHERE uid = :uid;";

        $statement = $this->connection->prepare($sql);
        $statement->bindValue(":uid", $uid, PDO::PARAM_INT);
        $statement->execute();

        $data = $statement->fetch(PDO::FETCH_ASSOC);

        return $data['cart'];

    }

    protected function update(string $new, string $uid): int {

        $sql = "UPDATE users
                SET cart = :cart
                WHERE uid = :uid;";

        $statement = $this->connection->prepare($sql);         
        $statement->bindValue(":cart", $new, PDO::PARAM_STR);
        $statement->bindValue(":uid", $uid, PDO::PARAM_STR);

        return $statement->rowCount();

    }

}