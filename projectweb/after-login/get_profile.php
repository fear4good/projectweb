<?php

    include '../connect.php';
    
    $logged_user = $_SESSION['username'];

    $userData = array();
    $sql_user = "SELECT username, email FROM users WHERE username=?";
    $stmt = $db->prepare($sql_user);
    $stmt->bind_param("s", $logged_user);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $uData = array(
                'username' => $row['username'],
                'email' => $row['email']
            );
            $userData[] = $uData;
        }
    }

    echo json_encode($userData);
?>