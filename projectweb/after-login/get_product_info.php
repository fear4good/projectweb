<?php

include '../connect.php';

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $productId = $_GET['product_id'];

    $sql = "SELECT name, image_path FROM products WHERE id = ?";
    $stmt = $db->prepare($sql);
    $stmt->bind_param("i", $productId);
    $stmt->execute();
    $stmt->bind_result($productName, $imagePath);
    $stmt->fetch();
    $stmt->close();

    $response = ["name" => $productName, "image_path" => $imagePath];
    header('Content-Type: application/json');
    echo json_encode($response);
}

?>