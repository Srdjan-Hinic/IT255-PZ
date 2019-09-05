<?php 
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');
    include("functions.php");
    if (
        isset($_POST['id']) &&
        isset($_POST['name'])) {
        $id = $_POST['id'];
        $name = $_POST['name'];
        }
    
    echo(updateAirportFunc($id,$name));


?>