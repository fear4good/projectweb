<?php

session_start();
unset($_SESSION['loggedin']);
session_destroy();
header('Location: ../index.php');
exit();
?>