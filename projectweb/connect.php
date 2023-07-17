<?php

    session_start();

    if(isset($_SESSION['loggedin'])){
      header('main.php');
    }

    $servername='localhost';
    $username='root';
    $password='';
    $dbname = "projectweb";

    $db = new mysqli($servername, $username, $password, $dbname);
    if($db->connect_error){
      die("Connection failed" . $db->connect_error);
    }

?> 

  