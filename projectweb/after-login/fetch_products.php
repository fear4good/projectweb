<?php
// Include the database connection file
include '../connect.php';

// Fetch all categories and their subcategories
$sql = "SELECT c.id AS category_id, c.name AS category_name, s.id AS subcategory_id, s.name AS subcategory_name, p.id AS product_id, p.name AS product_name
        FROM categories c
        LEFT JOIN subcategories s ON c.id = s.category_id
        LEFT JOIN products p ON s.id = p.subcategory_id
        ORDER BY c.id, s.id";

$result = $db->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    $current_category = null;

    while ($row = $result->fetch_assoc()) {
        $category_id = $row['category_id'];

        // Check if the category is already added to the data array
        if (!isset($data[$category_id])) {
            $data[$category_id] = array(
                'category_id' => $category_id,
                'category_name' => $row['category_name'],
                'subcategories' => array()
            );
        }

        // Add the subcategory if it exists
        if ($row['subcategory_id'] !== null) {
            $data[$category_id]['subcategories'][] = array(
                'subcategory_id' => $row['subcategory_id'],
                'subcategory_name' => $row['subcategory_name'],
                'products' => array()
            );
        }

        // Add the product if it exists
        if ($row['product_id'] !== null) {
            $data[$category_id]['subcategories'][count($data[$category_id]['subcategories']) - 1]['products'][] = array(
                'product_id' => $row['product_id'],
                'product_name' => $row['product_name']
            );
        }
    }

    // Convert the associative array to a simple indexed array and reindex the subcategories array
    $data = array_values($data);

    foreach ($data as &$category) {
        $category['subcategories'] = array_values($category['subcategories']);
    }

    echo json_encode($data);
} else {
    echo "No categories or subcategories found.";
}

$db->close();
?>