<?php

namespace model;
use model\Database;
use PDO;

class SignUp extends Database {

    private PDO $connection;

    public function __construct(Database $database) {
        $this->connection = $database->getConnection();
    }

    protected function setUser(string $uid, string $pwd, string $email): int {

        $sql = 'INSERT INTO users (uid, pwd, email)
                VALUES (:uid, :pwd, :email);';

        $statement = $this->connection->prepare($sql);
        $statement->bindValue(":uid", $uid, PDO::PARAM_STR);
        $statement->bindValue(":pwd", password_hash($pwd, PASSWORD_DEFAULT), PDO::PARAM_STR);
        $statement->bindValue(":email", $email, PDO::PARAM_STR);
        $statement->execute();

        return $statement->rowCount();

    }

    // Returns true if user ID is taken

    protected function isUidTaken(string $uid): bool {

        $sql = "SELECT uid
                FROM users
                WHERE uid = :uid;";
        
        $statement = $this->connection->prepare($sql);
        $statement->bindValue(":uid", $uid, PDO::PARAM_STR);
        $statement->execute();

        if ($statement->rowCount() !== 0) {
            return true;
        }

        return false;

    }

    // Returns true if email has a previous account
    
    protected function isEmailTaken(string $email): bool {

        $sql = "SELECT email
                FROM users
                WHERE email = :email;";
        
        $statement = $this->connection->prepare($sql);
        $statement->bindValue(":email", $email, PDO::PARAM_STR);
        $statement->execute();

        if ($statement->rowCount() !== 0) {
            return true;
        }

        return false;

    }

}