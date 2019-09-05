<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');
    include("functions.php");
    
    if( isset($_POST['password']) &&
        isset($_POST['firstName']) &&
        isset($_POST['lastName']) &&
        isset($_POST['country']) &&
        isset($_POST['pid'])){
        $password = $_POST['password'];
        $firstname = $_POST['firstName'];
        $lastname = $_POST['lastName'];
        $country = $_POST['country'];
        $pid = $_POST['pid'];
        
        echo register($password, $firstname, $lastname, $country, $pid);
    }
?>