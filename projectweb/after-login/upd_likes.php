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
