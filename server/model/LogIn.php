<?php

namespace model;
use model\Database;
use PDO;

class LogIn extends Database {

    private PDO $connection;

    public function __construct(Database $database) {
        $this->connection = $database->getConnection();
    }

    protected function getUser(string $uid, string $pwd): int {

        $sql = 'SELECT pwd 
                FROM users
                WHERE uid = :uid
                OR email = :email;';

        $statement = $this->connection->prepare($sql);
        $statement->bindValue(":uid", $uid, PDO::PARAM_STR);
        $statement->bindValue(":email", $uid, PDO::PARAM_STR);
        $statement->execute();

        $pwdHashed = $statement->fetch(PDO::FETCH_ASSOC);

        if ($statement->rowCount() === 0) {
            // Username not found
            return -1;
        } 
        
        if (! password_verify($pwd, $pwdHashed['pwd'])) {
            // Incorrect password
            return 0;
        } 

        $sql = 'SELECT *
        FROM users
        WHERE uid = :uid
        OR email = :email;';

        $statement = $this->connection->prepare($sql);
        $statement->bindValue(":uid", $uid, PDO::PARAM_STR);
        $statement->bindValue(":email", $uid, PDO::PARAM_STR);
        $statement->execute();

        $user = $statement->fetchAll(PDO::FETCH_ASSOC);

        session_start();

        $_SESSION['userid'] = $user[0]['id'];
        $_SESSION['useruid'] = $user[0]['uid'];

        return 1;

    }

}