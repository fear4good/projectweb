<?php
include '../connect.php';

$response = array();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $newPassword = $db->real_escape_string($_POST['new_password']);
    $currentPassword = $db->real_escape_string($_POST['current_password']);

    if (empty($newPassword) || empty($currentPassword)) {
        $response['success'] = false;
        $response['message'] = "Password is missing. ";
    } else if (strlen($newPassword) < 8) {
        $response['success'] = false;
        $response['message'] = "Password must be at least 8 characters. ";
    } else if (!preg_match('/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z@#\-_$%^&+=§!\?]{8,30}$/', $newPassword)) {
        $response['success'] = false;
        $response['message'] = "Password must contain one uppercase letter, one lowercase letter, and a symbol (@#\-_$%^&+=§!\?). ";
    } else {
        $userId = $_SESSION['id'];

        $sql = "SELECT password FROM users WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $stmt->bind_result($hashedPassword);
        $stmt->fetch();
        $stmt->close();

        if (password_verify($currentPassword, $hashedPassword)) {
            $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);

            $updateSql = "UPDATE users SET password = ? WHERE id = ?";
            $updateStmt = $db->prepare($updateSql);
            $updateStmt->bind_param("si", $hashedNewPassword, $userId);

            if ($updateStmt->execute()) {
                $response['success'] = true;
                $response["message"] = "Password updated successfully!";
            } else {
                $response['success'] = false;
                $response["message"] = "Error updating password: " . $stmt->error;
            }

            $updateStmt->close();
        } else {
            $response['success'] = false;
            $response['message'] = "Incorrect current password.";
        }
    }
}

$db->close();

header('Content-Type: application/json');
echo json_encode($response);

?>