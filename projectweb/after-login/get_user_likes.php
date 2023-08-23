<?php
include '../connect.php';

// Assuming you have a session or user ID to identify the user
$userId = $_SESSION['id'];

$sql = "SELECT * FROM like_history WHERE user_id = ? AND likes = 1";
$stmt = $db->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$likes = $result->fetch_all(MYSQLI_ASSOC);
$stmt->close();

header('Content-Type: application/json');
echo json_encode($likes);
?>