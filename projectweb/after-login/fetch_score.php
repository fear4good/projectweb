<?php

include '../connect.php';

// Get the user ID from session or another source
$user_id = $_SESSION['id'];

// Fetch the user's score from the database
$stmt = $db->prepare("SELECT score FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

// Return the score as JSON
echo json_encode(['score' => $row['score']]);


?>

