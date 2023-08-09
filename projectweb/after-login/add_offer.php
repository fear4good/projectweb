<?php
include '../connect.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the offer data from the POST request
    $supermarketId = $_POST["supermarket_id"];
    $productId = $_POST["product_id"];
    $discount = $_POST["discount"];
    $date = $_POST["date"];
    $stock = $_POST["stock"];
    $userId = $_SESSION["id"];

    // Validate the data if needed (e.g., check for empty fields, correct formats, etc.)

    // Check if the user has already submitted an offer for the same product
    $previousOffer = null;
    $sql = "SELECT discount FROM offers WHERE supermarket_id = '$supermarketId' AND product_id = '$productId' AND user_id = '$userId' ORDER BY date ASC LIMIT 1";
    $result = $db->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $previousOffer = $row["discount"];
    }

    // Check if the new offer is smaller by at least 20% compared to the previous offer
    if ($previousOffer === null || $discount <= ($previousOffer * 0.8)) {

        // 1. Fetch the average price from the day before
        $avg_price_sql = "SELECT AVG(price) AS avgprice FROM price_history WHERE product_id = $productId AND date = CURDATE() - INTERVAL 1 DAY";
        $avg_price_result = $db->query($avg_price_sql);

        if ($avg_price_result->num_rows > 0) {

            $avg_price_row = $avg_price_result->fetch_assoc();
                $previous_day_avg = $avg_price_row['avgprice'];
                // Check if the offer price is 20% or more lower than the average
                if ($previous_day_avg === null || $discount <= ( 0.8 * $previous_day_avg)) {
                    // The offer price is 20% or more lower than the average
                    $stmt = $db->query("UPDATE users SET score = score + 50 WHERE id = $userId");
                }
            }
        


        // Insert the offer data into the database
        $sql = "INSERT INTO offers (supermarket_id, product_id, discount, date, stock, user_id)
                VALUES ('$supermarketId', '$productId', '$discount', '$date', '$stock', '$userId')";

        if ($db->query($sql) === TRUE) {
            // Return the new offer discount along with the success message
            $response = array("success" => true, "message" => "Offer added successfully");
            echo json_encode($response);
        } else {
            // Return an error message or any data you need to notify the client-side about the error
            $response = array("success" => false, "message" => "Error adding offer: " . $db->error);
            echo json_encode($response);
        }
    } else {
        // Reject the new offer because it's not at least 20% smaller than the previous offer
        $response = array("success" => false, "message" => "The new offer must be at least 20% smaller than the previous offer.");
        echo json_encode($response);
    }
} else {
    // Return an error message if the request method is not POST
    $response = array("success" => false, "message" => "Invalid request method");
    echo json_encode($response);
}

$db->close();
?>
