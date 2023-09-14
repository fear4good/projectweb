<?php

    include '../connect.php';

    $query = "SELECT username, score FROM users ORDER BY score DESC";
    $result = $db->query($query);

    $leaderboardData = array();
    while ($row = $result->fetch_assoc()) {
        $leaderboardData[] = $row;
    }

    $db->close();
    header('Content-Type: application/json');
    echo json_encode($leaderboardData);
    
?>
