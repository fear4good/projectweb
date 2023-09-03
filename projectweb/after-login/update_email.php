<?php
include '../connect.php'; // Include the database connection file

$response = array();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $newEmail = $db->real_escape_string($_POST['new_email']);

    if(empty($newEmail)){
        $response['success'] = false;
        $response['message'] = "Email is missing. ";
    }else if(!filter_var($newEmail, FILTER_VALIDATE_EMAIL)){
        $response['success'] = false;
        $response['message'] = "Please enter a valid E-mail. ";
    }else {
        $userId = $_SESSION['id'];

        $sql = "UPDATE users SET email = ? WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("si", $newEmail, $userId);

        $response = array(); // Initialize an array for the response

        if ($stmt->execute()) {
            $response['success'] = true;
            $response["message"] = "Email updated successfully!";
        } else {
            $response['success'] = false;
            $response["message"] = "Error updating email: " . $stmt->error;
        }
        $stmt->close();
    }
}

$db->close();

// Send the JSON response
header('Content-Type: application/json');
echo json_encode($response);

?>