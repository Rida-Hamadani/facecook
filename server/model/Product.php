<?php

namespace model;
use model\Database;
use PDO;

class Product extends Database {

    private PDO $connection;

    public function __construct(Database $database) {
        $this->connection = $database->getConnection();
    }

    protected function getAll(): array {

        $sql = "SELECT * 
                FROM products;";

        $statement = $this->connection->query($sql);

        $data = [];

        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

            $row['featured'] = (bool) $row['featured'];

            $data[] = $row;

        }

        return $data;

    }

    protected function getFeatured(): array {

        $sql = "SELECT * 
                FROM products
                WHERE featured=1;";

        $statement = $this->connection->query($sql);

        $data = [];

        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

            $row['featured'] = (bool) $row['featured'];

            $data[] = $row;

        }

        return $data;

    }


    protected function create(array $data): string {

        $sql = "INSERT INTO products (name, description, cost, featured)
                VALUES (:name, :description, :cost, :featured);";

        $statement = $this->connection->prepare($sql);

        $statement->bindValue(":name", $data["name"], PDO::PARAM_STR);
        $statement->bindValue(":description", $data["description"], PDO::PARAM_STR);
        $statement->bindValue(":cost", $data["cost"], PDO::PARAM_INT);
        $statement->bindValue(":featured", (bool) $data["featured"] ?? false, PDO::PARAM_BOOL);
        $statement->execute();

        return $this->connection->lastInsertId();

    }

    protected function get(string $id): array {

        $sql = "SELECT * 
                FROM products
                WHERE id = :id;";

        $statement = $this->connection->prepare($sql);
        $statement->bindValue(":id", $id, PDO::PARAM_INT);
        $statement->execute();

        $data = $statement->fetch(PDO::FETCH_ASSOC);

        if ($data !== false){

            $data['featured'] = (bool) $data['featured'];

        } else {
            $data = [];
        }

        return $data;

    }

    protected function update(array $current, array $new): int {

        $sql = "UPDATE products
                SET name = :name, description = :description, cost = :cost, featured = :featured
                WHERE id = :id;";

        $statement = $this->connection->prepare($sql);         
        $statement->bindValue(":name", $new["name"] ?? $current["name"], PDO::PARAM_STR);
        $statement->bindValue(":description", $new["description"] ?? $current["description"], PDO::PARAM_STR);
        $statement->bindValue(":featured", $new["featured"] ?? $current["featured"], PDO::PARAM_BOOL);
        $statement->bindValue(":cost", $new["cost"] ?? $current["cost"], PDO::PARAM_INT);
        $statement->bindValue(":id", $current["id"], PDO::PARAM_INT);
        $statement->execute();

        return $statement->rowCount();

    }

    protected function delete(string $id): int {

        $sql = "DELETE FROM products
               WHERE id=:id;";

        $statement = $this->connection>prepares($sql);
        $statement->bindValue(":id", $id, PDO::PARAM_INT);
        $statement->execute();

        return $statement->rowCount(); 
    }
    
}