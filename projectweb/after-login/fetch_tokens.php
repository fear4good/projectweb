<?php

include '../connect.php';

$tokens = 0;

if (isset($_SESSION['loggedin']) && $_SESSION['role'] != 'admin') {
    // Fetch tokens for the user for the current month
    $stmt = $db->prepare("SELECT tokens FROM tokens WHERE id = ?");
    $stmt->bind_param("s", $_SESSION['id']);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        $tokens = $row['tokens'];
    }
    $stmt->close();
}

echo json_encode(['tokens' => $tokens]);
?>


