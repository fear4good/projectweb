<?php

include '../connect.php';

$userId = $_SESSION['id'];

$sql = "SELECT score, monthly_score FROM users WHERE id = ?";
$stmt = $db->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$stmt->bind_result($score, $monthlyScore);
$stmt->fetch();
$stmt->close();

$response = array("score" => $score, "monthly_score" => $monthlyScore);

header('Content-Type: application/json');
echo json_encode($response);
?>