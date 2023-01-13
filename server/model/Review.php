<?php

namespace model;
use model\Database;
use PDO;

class Review extends Database {

    private PDO $connection;

    public function __construct(Database $database) {
        $this->connection = $database->getConnection();
    }

    protected function getAll(int $product): array {

        $sql = "SELECT * 
                FROM reviews
                WHERE product = :product;";

        $statement = $this->connection->prepare($sql);
        $statement->bindValue(":product", $product, PDO::PARAM_INT);
        $statement->execute();

        $data = [];

        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

            $data[] = $row;

        }

        return $data;

    }

    protected function get(string $id): array {

        $sql = "SELECT * 
                FROM reviews
                WHERE id = :id;";

        $statement = $this->connection->prepare($sql);
        $statement->bindValue(":id", $id, PDO::PARAM_INT);
        $statement->execute();

        $data = $statement->fetch(PDO::FETCH_ASSOC);

        return $data;

    }

    protected function create(array $data, string $product): string {

        $sql = "INSERT INTO reviews (title, body, stars, uid, product)
                VALUES (:title, :body, :stars, :uid, :product);";

        $statement = $this->connection->prepare($sql);

        $statement->bindValue(":title", $data["title"], PDO::PARAM_STR);
        $statement->bindValue(":body", $data["body"], PDO::PARAM_STR);
        $statement->bindValue(":stars", $data["stars"], PDO::PARAM_INT);
        $statement->bindValue(":uid", $data["uid"], PDO::PARAM_STR);
        $statement->bindValue(":product", $product, PDO::PARAM_INT);
        $statement->execute();

        return $this->connection->lastInsertId();

    }

    protected function update(array $current, string $product, array $new): int {

        $sql = "UPDATE reviews
                SET title = :title, body = :body, stars = :stars, uid = :uid, product = :product
                WHERE id = :id;";

        $statement = $this->connection->prepare($sql);         
        $statement->bindValue(":title", $new["title"] ?? $current["title"], PDO::PARAM_STR);
        $statement->bindValue(":body", $new["body"] ?? $current["body"], PDO::PARAM_STR);
        $statement->bindValue(":stars", $new["stars"] ?? $current["stars"], PDO::PARAM_INT);
        $statement->bindValue(":uid", $new["uid"] ?? $current["uid"], PDO::PARAM_STR);
        $statement->bindValue(":product", $product, PDO::PARAM_INT);
        $statement->bindValue(":id", $current["id"], PDO::PARAM_INT);
        $statement->execute();

        return $statement->rowCount();

    }

    protected function delete(string $id): int {

        $sql = "DELETE FROM reviews
               WHERE id=:id;";

        $statement = $this->connection->prepare($sql);
        $statement->bindValue(":id", $id, PDO::PARAM_INT);
        $statement->execute();

        return $statement->rowCount(); 
    }
    
}