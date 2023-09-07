<?php

include '../connect.php';


$userId = $_SESSION['id'];

$sql = "SELECT total_tokens, monthly_tokens FROM users WHERE id = ?";
$stmt = $db->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$tokens = $result->fetch_assoc();

$stmt->close();

header('Content-Type: application/json');
echo json_encode($tokens);
?>