<?php
include '../connect.php';

$response = array();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $supermarketId = $_POST["supermarket_id"];
    $productId = $_POST["product_id"];
    $discount = $_POST["discount"];
    $date = date("Y-m-d");
    $stock = $_POST["stock"];
    $userId = $_SESSION["id"];

    $previousOffer = null;
    $sql = "SELECT discount FROM offers WHERE supermarket_id = '$supermarketId' AND product_id = '$productId' AND user_id = '$userId' ORDER BY date DESC LIMIT 1";
    $result = $db->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $previousOffer = $row["discount"];
    }

    // Check if the new offer is smaller by at least 20% compared to the previous offer
    if ($previousOffer === null || $discount <= ($previousOffer * 0.8)) {

        $product_id = $_POST['product_id'];
        $provided_price = $_POST['discount'];

        // 1. Fetch the average price from the day before
        $avg_price_sql = "SELECT AVG(price) as avgPrice FROM price_history WHERE product_id = ? AND date = CURDATE() - INTERVAL 1 DAY";
        $avg_price_stmt = $db->prepare($avg_price_sql);
        $avg_price_stmt->bind_param("i", $product_id);
        $avg_price_stmt->execute();
        $avg_price_result = $avg_price_stmt->get_result();
        $avg_price_row = $avg_price_result->fetch_assoc();
        if ($avg_price_row) {
                $previous_day_avg = $avg_price_row['avgPrice'];
                // Check if the offer price is 20% or more lower than the average
                if ($discount <= 0.8 * $previous_day_avg) {
                    $user_id = $_SESSION['id'];
                    $stmt = $db->prepare("UPDATE users SET monthly_score = monthly_score + 50 WHERE id = ?");
                    $stmt->bind_param("i", $user_id);
                    $stmt->execute();
                }
            }
        
        //fetch avg price for week before
        $start_last_week = date("Y-m-d", strtotime("-7 days"));
        $end_last_week = date("Y-m-d", strtotime("-1 days"));
        $avg_price_last_week_query = "SELECT AVG(price) as avg_price FROM price_history WHERE product_id = ? AND date BETWEEN ? AND ?";
        $avgweek = $db->prepare($avg_price_last_week_query);
        $avgweek->bind_param("iss", $product_id, $start_last_week, $end_last_week);
        $avgweek->execute();
        $result = $avgweek->get_result();
        $row = $result->fetch_assoc();
        if ($row) {
            $avg_price_last_week = $row['avg_price'];
            if ($discount <= 0.8 * $avg_price_last_week) {
            // Reward user with 20 points
            $user_id = $_SESSION['id'];  // fetching user id from session
            $stmt = $db->prepare("UPDATE users SET monthly_score = monthly_score + 20 WHERE id = ?");
            $stmt->bind_param("i", $user_id);
            $stmt->execute();
            }
        }

        $expiryDate = date('Y-m-d', strtotime($date . ' + 7 days'));
        $sql = "INSERT INTO offers (supermarket_id, product_id, discount, date, stock, user_id, expiry_date)
                VALUES ('$supermarketId', '$productId', '$discount', '$date', '$stock', '$userId', '$expiryDate')";

        if ($db->query($sql) === TRUE) {
            $response = array("success" => true, "message" => "Offer added successfully");
            echo json_encode($response);
        } else {
            $response = array("success" => false, "message" => "Error adding offer: " . $db->error);
            echo json_encode($response);
        }
    } else {
        $response = array("success" => false, "message" => "The new offer must be at least 20% smaller than the previous offer.");
        echo json_encode($response);
    }
} else {
    $response = array("success" => false, "message" => "Invalid request method");
    echo json_encode($response);
}

$db->close();
?>
