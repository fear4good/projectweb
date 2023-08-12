<?php
include '../connect.php'; // Include the database connection file

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $currentPassword = $_POST['current_password'];
    $newPassword = $_POST['new_password'];

    // Assuming you have a session or user ID to identify the user
    $userId = $_SESSION['id'];

    // Fetch the current password from the database
    $sql = "SELECT password FROM users WHERE id = ?";
    $stmt = $db->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $stmt->bind_result($hashedPassword);
    $stmt->fetch();
    $stmt->close();

    // Verify the current password
    if (password_verify($currentPassword, $hashedPassword)) {
        // Hash and update the new password
        $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);

        $updateSql = "UPDATE users SET password = ? WHERE id = ?";
        $updateStmt = $db->prepare($updateSql);
        $updateStmt->bind_param("si", $hashedNewPassword, $userId);

        if ($updateStmt->execute()) {
            echo "Password updated successfully!";
        } else {
            echo "Error updating password: " . $updateStmt->error;
        }

        $updateStmt->close();
    } else {
        echo "Incorrect current password.";
    }
}

$db->close();
?>