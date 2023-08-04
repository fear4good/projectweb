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
    $sql = "SELECT discount FROM offers WHERE supermarket_id = '$supermarketId' AND product_id = '$productId' AND user_id = '$userId' ORDER BY date DESC LIMIT 1";
    $result = $db->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $previousOffer = $row["discount"];
    }

    // Check if the new offer is smaller by at least 20% compared to the previous offer
    if ($previousOffer === null || $discount <= ($previousOffer * 0.8)) {
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
