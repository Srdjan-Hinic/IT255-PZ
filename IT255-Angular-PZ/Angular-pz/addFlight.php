<?php 
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, Token, token, TOKEN');
    include("functions.php");
    if (
        isset($_POST['departureAirport']) &&
        isset($_POST['departureTimeDate']) &&
        isset($_POST['arrivalAirport']) &&
        isset($_POST['arrivalTimeDate']) &&
        isset($_POST['tickets'])
        ) {
        $departureAirport = $_POST['departureAirport'];
        $departureTimeDate = $_POST['departureTimeDate'];
        $arrivalAirport = $_POST['arrivalAirport'];
        $arrivalTimeDate = $_POST['arrivalTimeDate'];
        $tickets = $_POST['tickets'];
        }
    
    echo(addFlightFunc($departureAirport, $departureTimeDate,$arrivalAirport, $arrivalTimeDate, $tickets));
    ?>