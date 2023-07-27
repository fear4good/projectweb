<?php
session_start();

$tokens = 0;

if (isset($_SESSION['loggedin']) && $_SESSION['role'] != 'admin') {
    // Fetch tokens for the user for the current month
    $mysqli = new mysqli('localhost', 'root', '', 'projectweb');
    $monthYear = date('Y-m');
    $stmt = $mysqli->prepare("SELECT tokens FROM tokens WHERE id = ? AND date_ = ?");
    $stmt->bind_param("is", $_SESSION['id'], $monthYear);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        $tokens = $row['tokens'];
    }
    $stmt->close();
    $mysqli->close();
}

echo json_encode(['tokens' => $tokens]);
?>


