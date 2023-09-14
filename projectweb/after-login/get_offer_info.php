<?php
include '../connect.php';

$offerId = $_GET['offer_id'];

$sql = "SELECT * FROM offers WHERE id = ?";
$stmt = $db->prepare($sql);
$stmt->bind_param("i", $offerId);
$stmt->execute();
$result = $stmt->get_result();
$offerInfo = $result->fetch_assoc();
$stmt->close();

$productSql = "SELECT name, image_path FROM products WHERE id = ?";
$productStmt = $db->prepare($productSql);
$productStmt->bind_param("i", $offerInfo['product_id']);
$productStmt->execute();
$productResult = $productStmt->get_result();
$productInfo = $productResult->fetch_assoc();
$productStmt->close();

$combinedInfo = array_merge($offerInfo, $productInfo);

header('Content-Type: application/json');
echo json_encode($combinedInfo);
?>