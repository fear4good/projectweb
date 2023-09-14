<?php
include '../connect.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $offer_id = $_POST['offer_id'] ?? null;
    $action = $_POST['action'] ?? null;

    if ($offer_id && $action) {
        if ($action === 'like' || $action === 'dislike') {
            if ($action === 'like') {
                $sql = "UPDATE offers SET likes = likes + 1 WHERE id = '$offer_id'";
            } else {
                $sql = "UPDATE offers SET dislikes = dislikes + 1 WHERE id = '$offer_id'";
            }

            $user_id_query = "SELECT user_id FROM offers WHERE id = '$offer_id'";
            $user_id_result = $db->query($user_id_query);
            if ($user_id_result) {
                $user_id_row = $user_id_result->fetch_assoc();
                $user_id = $user_id_row['user_id'];

                if ($user_id !== null) {
                    $score_change = ($action === 'like') ? 5 : -1;
                    $update_score_sql = "UPDATE users SET monthly_score = monthly_score + $score_change WHERE id = '$user_id'";
                    $db->query($update_score_sql);
                }
            }

            if ($db->query($sql) === TRUE) {
                $fetch_sql = "SELECT likes, dislikes FROM offers WHERE id = '$offer_id'";
                $result = $db->query($fetch_sql);
                $data = $result->fetch_assoc();

                header('Content-Type: application/json');
                echo json_encode($data);
            } else {
                echo "Error updating data: " . $db->error;
            }
        } else {
            echo "Invalid action.";
        }
    } else {
        echo "Missing offer_id or action.";
    }
} else {
    echo "Unsupported request method.";
}

$db->close();
?>