<?php
include '../connect.php';

$category_id = $_GET['category'];
$subcategory_id = isset($_GET['subcategory']) ? $_GET['subcategory'] : null;

// Logic to fetch products based on category (and subcategory if provided)
$products_query = "SELECT * FROM products WHERE category_id = $category_id";
if($subcategory_id) {
    $products_query .= " AND subcategory_id = $subcategory_id";
}

$products_result = $db->query($products_query);
$discounts = [];

while($product = $products_result->fetch_assoc()) {
    $product_id = $product['id'];

    // Logic to fetch average price for the product from the previous week
    $start_last_week = date("Y-m-d", strtotime("-7 days"));
    $end_last_week = date("Y-m-d", strtotime("-1 days"));
    $avg_price_last_week_query = "SELECT AVG(price) as avg_price FROM price_history WHERE product_id = ? AND date BETWEEN ? AND ?";
    $avgweek = $db->prepare($avg_price_last_week_query);
    $avgweek->bind_param("iss", $product_id, $start_last_week, $end_last_week);
    $avgweek->execute();
    $result = $avgweek->get_result();
    $row = $result->fetch_assoc();
    $avg_price_last_week = $row['avg_price'];

    // Logic to fetch the latest offer price for the product
    $offer_price_query = "SELECT discount FROM offers WHERE product_id = ? ORDER BY date DESC LIMIT 1";
    $offerStmt = $db->prepare($offer_price_query);
    $offerStmt->bind_param("i", $product_id);
    $offerStmt->execute();
    $offerResult = $offerStmt->get_result();
    $offerRow = $offerResult->fetch_assoc();
    $offer_price = $offerRow['discount'];

    // Logic to calculate the average discount for the product
    $discount = (($avg_price_last_week - $offer_price) / $avg_price_last_week) * 100;

    $discounts[] = $discount;  
}

header('Content-Type: application/json');
echo json_encode($discounts);  // Return the average discounts as a JSON array
?>
