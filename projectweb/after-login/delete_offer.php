<?php

include '../connect.php';

// Get the offer ID from POST
$offerId = $_POST['offer_id'];

// Perform the offer deletion in your database
$sql = "DELETE FROM offers WHERE id = ?";
$stmt = $db->prepare($sql);
$stmt->bind_param("s", $offerId);

$response = array();

if ($stmt->execute()) {
    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['error'] = "Error deleting offer: " . $db->error;
}

$stmt->close();
$db->close();

header('Content-Type: application/json');
echo json_encode($response);
?>
