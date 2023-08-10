<?php
include '../connect.php';

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the offer_id and action from the POST data
    $offer_id = $_POST['offer_id'] ?? null;
    $action = $_POST['action'] ?? null;

    // Check if both offer_id and action are provided
    if ($offer_id && $action) {
        // Validate the action (like or dislike)
        if ($action === 'like' || $action === 'dislike') {
            // Perform the update based on the action
            if ($action === 'like') {
                // Increase the likes count by 1
                $sql = "UPDATE offers SET likes = likes + 1 WHERE id = '$offer_id'";
            } else {
                // Increase the dislikes count by 1
                $sql = "UPDATE offers SET dislikes = dislikes + 1 WHERE id = '$offer_id'";
            }

            // Get the user_id associated with the offer
            $user_id_query = "SELECT user_id FROM offers WHERE id = '$offer_id'";
            $user_id_result = $db->query($user_id_query);
            if ($user_id_result) {
                $user_id_row = $user_id_result->fetch_assoc();
                $user_id = $user_id_row['user_id'];

                // Update user's score based on the action
                if ($user_id !== null) {
                    $score_change = ($action === 'like') ? 5 : -1;
                    $update_score_sql = "UPDATE users SET monthly_score = monthly_score + $score_change WHERE id = '$user_id'";
                    $db->query($update_score_sql);
                }
            }

            if ($db->query($sql) === TRUE) {
                // Fetch the updated likes and dislikes counts from the database
                $fetch_sql = "SELECT likes, dislikes FROM offers WHERE id = '$offer_id'";
                $result = $db->query($fetch_sql);
                $data = $result->fetch_assoc();

                // Return the updated likes and dislikes counts as JSON response
                header('Content-Type: application/json');
                echo json_encode($data);
            } else {
                // Handle the update error
                echo "Error updating data: " . $db->error;
            }
        } else {
            // Handle invalid action
            echo "Invalid action.";
        }
    } else {
        // Handle missing offer_id or action
        echo "Missing offer_id or action.";
    }
} else {
    // Handle unsupported request method
    echo "Unsupported request method.";
}

// Close the database connection
$db->close();
?>