<?php
include '../connect.php';

$sql = "SELECT 
            c.id AS category_id, c.name AS category_name,
            s.id AS subcategory_id, s.name AS subcategory_name,
            p.id AS product_id, p.name AS product_name,
            IFNULL(min_price.price, 0) AS min_price
            FROM categories c
            LEFT JOIN subcategories s ON c.id = s.category_id
            LEFT JOIN products p ON s.id = p.subcategory_id
            LEFT JOIN (
                SELECT product_id, MIN(price) AS price
                FROM price_history
                GROUP BY product_id
            ) min_price ON p.id = min_price.product_id
            ORDER BY c.id, s.id, p.id;";

$result = $db->query($sql);

if ($result->num_rows > 0) {
    $data = array();
    $current_category = null;
    $current_subcategory = null;

    while ($row = $result->fetch_assoc()) {
        $category_id = $row['category_id'];

        if (!isset($data[$category_id])) {
            $data[$category_id] = array(
                'category_id' => $category_id,
                'category_name' => $row['category_name'],
                'subcategories' => array()
            );
            $current_category = &$data[$category_id];
        }

        $subcategory_id = $row['subcategory_id'];
        if (!isset($current_category['subcategories'][$subcategory_id])) {
            $current_category['subcategories'][$subcategory_id] = array(
                'subcategory_id' => $subcategory_id,
                'subcategory_name' => $row['subcategory_name'],
                'products' => array()
            );
            $current_subcategory = &$current_category['subcategories'][$subcategory_id];
        }

        $product_id = $row['product_id'];
        if ($product_id !== null) {
            $current_subcategory['products'][] = array(
                'product_id' => $product_id,
                'product_name' => $row['product_name'],
                'min_price' => $row['min_price']
            );
        }
    }

    $data = array_values($data);

    foreach ($data as &$category) {
        $category['subcategories'] = array_values($category['subcategories']);
        foreach ($category['subcategories'] as &$subcategory) {
            $subcategory['products'] = array_values($subcategory['products']);
        }
    }

    echo json_encode($data);
} else {
    echo "No categories or subcategories found.";
}


$db->close();
?>
