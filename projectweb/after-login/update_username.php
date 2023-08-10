<?php

include '../connect.php'; // Include the database connection file

$response = array();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $newUsername = $_POST['new_username'];

    // Assuming you have a session or user ID to identify the user
    $userId = $_SESSION['id'];

    $sql = "UPDATE users SET username = ? WHERE id = ?";
    $stmt = $db->prepare($sql);
    $stmt->bind_param("si", $newUsername, $userId);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "Username updated successfully!";
    } else {
        $response['success'] = false;
        $response['message'] = "Error updating username: " . $stmt->error;
    }

    $stmt->close();
}

$db->close();

header('Content-Type: application/json');
echo json_encode($response);
?>