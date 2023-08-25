<?php
include '../connect.php';

// Assuming you're receiving the offer_id from the AJAX request
$offerId = $_GET['offer_id'];

// Fetch offer information from the offers table based on the offer_id
$sql = "SELECT * FROM offers WHERE id = ?";
$stmt = $db->prepare($sql);
$stmt->bind_param("i", $offerId);
$stmt->execute();
$result = $stmt->get_result();
$offerInfo = $result->fetch_assoc();
$stmt->close();

// Assuming you have a products table to fetch additional product information
$productSql = "SELECT name, image_path FROM products WHERE id = ?";
$productStmt = $db->prepare($productSql);
$productStmt->bind_param("i", $offerInfo['product_id']);
$productStmt->execute();
$productResult = $productStmt->get_result();
$productInfo = $productResult->fetch_assoc();
$productStmt->close();

// Combine offer information with product information
$combinedInfo = array_merge($offerInfo, $productInfo);

header('Content-Type: application/json');
echo json_encode($combinedInfo);
?>