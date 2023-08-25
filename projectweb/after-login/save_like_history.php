<?php
include '../connect.php';

// Assuming you have session or user ID to identify the user
$userId = $_SESSION['id'];

// Assuming you're receiving offer_id, user_id, likes, and dislikes from AJAX request
$offerId = $_POST['offer_id'];
$likes = $_POST['likes'];
$dislikes = $_POST['dislikes'];

// Insert the like history into the like_history table
$sql = "INSERT INTO like_history (offer_id, user_id, likes, dislikes) VALUES (?, ?, ?, ?)";
$stmt = $db->prepare($sql);
$stmt->bind_param("iiii", $offerId, $userId, $likes, $dislikes);

if ($stmt->execute()) {
  $response = array("success" => true, "message" => "Like history saved successfully.");
} else {
  $response = array("success" => false, "message" => "Error saving like history.");
}

$stmt->close();

header('Content-Type: application/json');
echo json_encode($response);
?>





