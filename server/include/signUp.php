<?php

if (isset($_POST['submit'])) {

    // Grab the data
    $uid = $_POST['uid'];
    $pwd = $_POST['pwd'];
    $pwdRepeat = $_POST['pwdRepeat'];
    $email = $_POST['email'];

    // Instansiate SinUpController

    include '../config.php';
    include '../src/Database.php';
    include '../auth/SingUpGateway.php';
    include '../auth/SingUpController.php';

    $signUp = new controller\SignUp($uid, $pwd, $pwdRepeat, $email);

    // User sign up with error handling

    $signUp->signUpUser();

    // Going back to homepage

    header("location: ../index.php?error=none");

}