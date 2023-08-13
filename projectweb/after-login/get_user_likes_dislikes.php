<?php

include '../connect.php';

// Assuming you have a session or user ID to identify the user
$userId = $_SESSION['id'];

$sql = "SELECT likes, dislikes FROM offers WHERE user_id = ?";
$stmt = $db->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$likesDislikes = $result->fetch_all(MYSQLI_ASSOC);
$stmt->close();

header('Content-Type: application/json');
echo json_encode($likesDislikes);
?>