<?php

if (isset($_POST['submit'])) {

    // Grab the data
    $uid = $_POST['uid'];
    $pwd = $_POST['pwd'];

    // Instansiate SinUpController

    $logIn = new controller\LogIn($uid, $pwd);

    // User sign up with error handling

    $logIn->logInUser();

    // Going back to homepage

    header("location: ../index.php?error=none");

}