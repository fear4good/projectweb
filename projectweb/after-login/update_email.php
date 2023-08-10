<?php

include '../connect.php';

header('Content-Type: application/json'); // Set the response header to JSON

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $newEmail = $_POST['new_email'];
    $userId = $_SESSION['id'];

    $sql = "UPDATE users SET email = ? WHERE id = ?";
    $stmt = $db->prepare($sql);
    $stmt->bind_param("si", $newEmail, $userId);

    $response = array(); // Initialize an array for the response

    if ($stmt->execute()) {
        $response["message"] = "Email updated successfully!";
    } else {
        $response["message"] = "Error updating email: " . $stmt->error;
    }

    $stmt->close();

    echo json_encode($response); // Encode the response array as JSON
}

$db->close();
?>