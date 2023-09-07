<?php
include '../connect.php';

$marketId = $_GET['marketid'];

// Fetch offers information along with product, user, category, and subcategory information
$sql = "SELECT 
            offers.*,
            products.name AS product_name, 
            products.image_path AS product_image,
            users.username AS user_username,
            users.total_tokens AS user_tokens,
            categories.name AS category_name,
            subcategories.name AS subcategory_name,
            pois.name AS poi_name
        FROM offers
        LEFT JOIN products ON offers.product_id = products.id
        LEFT JOIN users ON offers.user_id = users.id
        LEFT JOIN categories ON products.category_id = categories.id
        LEFT JOIN subcategories ON products.subcategory_id = subcategories.id
        LEFT JOIN pois ON offers.supermarket_id = pois.id
        WHERE offers.supermarket_id = ?";

        
$stmt = $db->prepare($sql);
$stmt->bind_param("i", $marketId);
$stmt->execute();
$result = $stmt->get_result();

$combinedOffers = [];

// Fetching all the combined information
while ($row = $result->fetch_assoc()) {
    $combinedOffers[] = $row;
}

$stmt->close();

header('Content-Type: application/json');
echo json_encode($combinedOffers);
?>
