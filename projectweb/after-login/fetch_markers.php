<?php
include '../connect.php';

$markers = array(); 
$sql = "SELECT p.id, p.name AS poi_name, p.latitude AS lat, p.longitude AS lng, 
               o.discount, pr.name AS prod_name, c.name AS category, sc.name AS subcategory
        FROM pois p
        LEFT JOIN offers o ON p.id = o.supermarket_id
        LEFT JOIN products pr ON o.product_id = pr.id
        LEFT JOIN subcategories sc ON pr.subcategory_id = sc.id
        LEFT JOIN categories c ON sc.category_id = c.id";
$result = $db->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $marker = array(
            'poi_name' => $row['poi_name'],
            'name' => $row['prod_name'],
            'lat' => $row['lat'],
            'lng' => $row['lng'],
            'discount' => $row['discount'],
            'category' => $row['category'],
            'subcategory' => $row['subcategory']
        );
        $markers[] = $marker;
    }
}

echo json_encode($markers);
?>
