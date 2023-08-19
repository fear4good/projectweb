<?php

    include '../connect.php';

    // Query to retrieve user data
    $query = "SELECT username, score FROM users ORDER BY score DESC";
    $result = $db->query($query);

    $leaderboardData = array();
    while ($row = $result->fetch_assoc()) {
        $leaderboardData[] = $row;
    }

    // Close the database connection
    $db->close();

    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode($leaderboardData);
    
?>
