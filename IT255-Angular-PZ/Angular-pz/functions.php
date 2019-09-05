<?php
include("config.php");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    die();
}

// check if a passenger is logged in
function checkIfLoggedIn(){
    global $conn;
    if(isset($_SERVER['HTTP_TOKEN'])){
        $token = $_SERVER['HTTP_TOKEN'];
        $result = $conn->prepare("SELECT * FROM passenger WHERE token=?");
        $result->bind_param("s",$token);
        $result->execute();
        $result->store_result();
        $num_rows = $result->num_rows;
        if($num_rows > 0)
        {
            return true;
        }
        else{   
            return false;
        }
    }
    else{
        return false;
    }
}

// passenger log in
function login($pid, $password){
    global $conn;
    $rarray = array();
    $errors = "";
    if($pid=="null"){
        $errors .= "Personal ID is empty\r\n";
    }
    if($password=="null"){
        $errors .= "Password is empty\r\n";
    }
    if(checkLogin($pid,$password)){
        $token = sha1(uniqid());
        $result2 = $conn->prepare("UPDATE passenger SET token=? WHERE p_id=?");
        $result2->bind_param("si",$token,$pid);
        $result2->execute();
        $rarray['token'] = $token;
        $rarray['admin'] = checkAdmin1($token);
    } else{
        header('HTTP/1.1 401 Unauthorized');
        $errors .= "Invalid Personal ID or password\r\n";
        $rarray['error'] = json_encode($errors);
    }
    return json_encode($rarray);
}

function checkLogin($pid, $password){
    global $conn;
    $pass = md5($password);
    $result = $conn->prepare("SELECT * FROM passenger WHERE p_id=? AND password=?");
    $result->bind_param("is",$pid,$pass);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if($num_rows > 0)
    {
        return true;
    }
    else{   
        return false;
    }
}

// check if the passenger that wants to log in is an admin
function checkAdmin1($token){
    global $conn;
    return $conn->query("SELECT admin FROM passenger WHERE token = '$token'")->fetch_object()->admin;
}

 // register a new passenger
function register($password, $firstname, $lastname, $country, $pid){
    global $conn;
    $rarray = array();
    $errors = "";

    if(checkIfUserExists($pid)){
        $errors .= "Personal ID already exists\r\n";
    }
    if(strlen($password) < 5 || $password == ''){
        $errors .= "Password must be at least 5 characters long\r\n";
    }
    if(strlen($firstname) < 3 || $firstname == ''){
        $errors .= "Name must be at least 3 characters long\r\n";
    }
    if(strlen($lastname) < 3 || $lastname == ''){
        $errors .= "Last name must be at least 3 characters long\r\n";
    }
    if ($pid < 9999) {
        $errors .= "Personal id must be at least 5 numbers long\r\n";
    }
        if($errors == ""){
        $stmt = $conn->prepare("INSERT INTO passenger (p_id, name, last_name, password, country) VALUES (?, ?, ?, ?, ?)");
        $pass =md5($password);
        $stmt->bind_param("issss", $pid, $firstname, $lastname, $pass ,$country);
        if($stmt->execute()){
            $token = sha1(uniqid());
            $result2 = $conn->prepare("UPDATE passenger SET token=? WHERE p_id=?");
            $result2->bind_param("ss",$token,$pid);
            $result2->execute();
            $rarray['token'] = $token;
        }else{
            header('HTTP/1.1 400 Bad request');
            $rarray['error'] = "Database connection error";
        }
    } else{
        header('HTTP/1.1 400 Bad request');
        $rarray['error'] = json_encode($errors);
    }
    
    return json_encode($rarray);
}
 // check if a passenger exists
function checkIfUserExists($pid){
    global $conn;
    $result = $conn->prepare("SELECT * FROM passenger WHERE p_id=?");
    $result->bind_param("i",$pid);
    $result->execute();
    $result->store_result();
    $num_rows = $result->num_rows;
    if($num_rows > 0)
    {
        return true;
    }
    else{   
        return false;
    }
}

function getCountries() {
    global $conn;
    $rarray = array();
        $result = $conn->query("SELECT id, country FROM countries");
        $num_rows = $result->num_rows;
        $countries = array();
        if($num_rows > 0)
        {
            while($row = $result->fetch_assoc()) {
                $country = array();
                $country['id'] = $row['id'];
                $country['country'] = $row['country'];
                array_push($countries,$country);
            }
        }
        $rarray['countries'] = $countries;
        return json_encode($rarray);
}

function addAirportFunc($name,$city,$country) {
    global $conn;
    $rarray = array();
    $errors = "";
    
    if(strlen($name) < 3 || $name == ''){
        $errors .= "The name must be at least 3 characters long.\r\n";
    }
    if(strlen($city) < 3 || $city == ''){
        $errors .= "The city name must be at least 3 characters long.\r\n";
    }
 
    if ($errors == "") {
        $stmt = $conn->prepare("INSERT INTO airport (name,city,country) VALUES (?,?,?)");
        $stmt->bind_param("ssi",$name,$city,$country);

        if ($stmt->execute()) {
        }else {
            header('HTTP/1.1 400 Bad request');
            $rarray['error'] = "Database connection error";
        }
    }else {
        header('HTTP/1.1 400 Bad request');
        $rarray['error'] = json_encode($errors);
    }   
    
    return json_encode($rarray);
}


function getAirportsFunc() {
    global $conn;
    $rarray = array();

        $result = $conn->query("SELECT id,name,city,(SELECT country from countries where airport.country = countries.id) as country FROM airport");
        $num_rows = $result->num_rows;
        $airports = array();
        if($num_rows > 0)
        {
            while($row = $result->fetch_assoc()) {
                $airport = array();
                $airport['id'] = $row['id'];
                $airport['city'] = $row['city'];
                $airport['name'] = $row['name'];
                $airport['country'] = $row['country'];
                array_push($airports,$airport);
            }
        }
        $rarray['airports'] = $airports;
        return json_encode($rarray);
}


function updateAirportFunc($id,$name) {
    global $conn;
    $rarray = array();
    $errors = "";

    $stmt = $conn->prepare("UPDATE airport SET name=? WHERE id=?");
    $stmt->bind_param("si",$name,$id);

    if ($stmt->execute()) {
        }else {
            header('HTTP/1.1 400 Bad request');
            $rarray['error'] = "Database connection error";
        }
    return json_encode($rarray);
}

function addFlightFunc($departureAirport, $departureTimeDate,$arrivalAirport, $arrivalTimeDate, $tickets) {
    global $conn;
    $rarray = array();
    $errors = "";

    if($errors == ""){
        $stmt = $conn->prepare("INSERT INTO flight (dep_airport_id, arr_airport_id, date_departure, date_arrival, tickets) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("iissi", $departureAirport,$arrivalAirport, $departureTimeDate, $arrivalTimeDate, $tickets);

        if($stmt->execute()){
            // cool
        } else{
            header('HTTP/1.1 400 Bad request');
            $rarray['error'] = "Database connection error";
        }
    } else{
        header('HTTP/1.1 400 Bad request');
        $rarray['error'] = json_encode($errors);
    }
    
    return json_encode($rarray);
}

function getFlightsFunc() {
    global $conn;
    $rarray = array();

        $result = $conn->query("SELECT id, 
        (SELECT name from airport where airport.id = flight.arr_airport_id) as arr_name, 
        (SELECT city from airport where airport.id = flight.arr_airport_id) as arr_city,
        (SELECT countries.country FROM countries, airport, flight WHERE flight.dep_airport_id = airport.id AND airport.country = countries.id) as arr_country, 
        (SELECT name from airport where airport.id = flight.dep_airport_id) as dep_name, 
        (SELECT city from airport where airport.id = flight.dep_airport_id) as dep_city,
        (SELECT countries.country FROM countries, airport, flight WHERE flight.dep_airport_id = airport.id AND airport.country = countries.id) as dep_country, 
        date_arrival, 
        date_departure,
        tickets 
        FROM flight");
        $num_rows = $result->num_rows;
        $flights = array();
        if($num_rows > 0)
        {
            while($row = $result->fetch_assoc()) {
                $flight = array();
                $flight['id'] = $row['id'];
                $flight['arr_name'] = $row['arr_name'];
                $flight['arr_city'] = $row['arr_city'];
                $flight['arr_country'] = $row['arr_country'];
                $flight['date_arrival'] = $row['date_arrival'];
                $flight['dep_name'] = $row['dep_name'];
                $flight['dep_city'] = $row['dep_city'];
                $flight['dep_country'] = $row['dep_country'];
                $flight['date_departure'] = $row['date_departure'];
                $flight['tickets'] = $row['tickets'];
                array_push($flights,$flight);
            }
        }
        $rarray['flights'] = $flights;
        return json_encode($rarray);
}
 ?>