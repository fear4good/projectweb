<?php
include '../connect.php';

$userId = $_SESSION['id'];

$sql = "SELECT * FROM like_history WHERE user_id = ? AND dislikes = 1";
$stmt = $db->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();
$dislikes = $result->fetch_all(MYSQLI_ASSOC);
$stmt->close();

header('Content-Type: application/json');
echo json_encode($dislikes);
?>