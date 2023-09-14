<?php

include '../connect.php';

$year = $_GET['year'];
$month = $_GET['month'];
$query = "SELECT DAY(`date`) as day, COUNT(*) as count FROM `offers` WHERE YEAR(`date`) = $year AND MONTH(`date`) = $month GROUP BY DAY(`date`)";
$result = mysqli_query($db, $query);
$offers = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($offers);
?>
