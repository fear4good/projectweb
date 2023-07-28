<?php

include '../connect.php';


// Get the year and month from the request
$year = $_GET['year'];
$month = $_GET['month'];

// Query the database to count the offers for each day of the given year and month
$query = "SELECT DAY(`date`) as day, COUNT(*) as count FROM `offers` WHERE YEAR(`date`) = $year AND MONTH(`date`) = $month GROUP BY DAY(`date`)";
$result = mysqli_query($db, $query);

// Fetch all the rows as an associative array
$offers = mysqli_fetch_all($result, MYSQLI_ASSOC);

// Return the data as a JSON string
echo json_encode($offers);
?>
