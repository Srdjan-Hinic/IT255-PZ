<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');
    include("functions.php");
    
    if( isset($_POST['name']) &&
        isset($_POST['city']) &&
        isset($_POST['country'])) {
        $name = $_POST['name'];
        $city = $_POST['city'];
        $country = $_POST['country'];
        }
        echo addAirportFunc($name,$city,$country);
?>