<?php

include '../connect.php';

// Fetch all regular users
$result = $mysqli->query("SELECT id FROM users WHERE is_admin = 0");

// Calculate total tokens
$totalTokens = $result->num_rows * 100;

// Calculate 80% of total tokens
$distributableTokens = $totalTokens * 0.8;

// Fetch total score of all users for the month
$totalScore = 0;
foreach ($result as $row) {
    $totalScore += getScoreForUser($row['id'], date('Y-m'));
}

// Distribute tokens to users based on their scores
foreach ($result as $row) {
    $userScore = getScoreForUser($row['id'], date('Y-m'));
    $userTokens = round($userScore / $totalScore * $distributableTokens);

    // Add record to user_tokens table
    $stmt = $mysqli->prepare("INSERT INTO tokens (id, date_, tokens) VALUES (?, ?, ?)");
    $stmt->bind_param("isi", $row['id'], date('Y-m'), $userTokens);
    $stmt->execute();
}

$mysqli->close();
?>
