<?php
    include '../connect.php';

    $category = $_GET['category'] ?? null;
    $subcategory = $_GET['subcategory'] ?? null;

    $sql = "SELECT p.id AS poi_id, p.name AS poi_name, p.latitude AS lat, p.longitude AS lng, 
                o.id AS offer_id, o.discount, o.date, o.likes, o.dislikes, o.stock,
                pr.name AS prod_name, pr.image_path AS image_path, 
                c.name AS category, 
                sc.name AS subcategory,
                u.username
            FROM pois p
            LEFT JOIN offers o ON p.id = o.supermarket_id
            LEFT JOIN products pr ON o.product_id = pr.id
            LEFT JOIN subcategories sc ON pr.subcategory_id = sc.id
            LEFT JOIN categories c ON sc.category_id = c.id
            LEFT JOIN users u ON o.user_id = u.id";

    if ($category && $subcategory) {
        $sql .= " WHERE c.id = '$category' AND sc.id = '$subcategory' AND o.discount IS NOT NULL";
    } elseif ($category) {
        $sql .= " WHERE c.id = '$category' AND o.discount IS NOT NULL";
    } elseif ($subcategory) {
        $sql .= " WHERE sc.id = '$subcategory' AND o.discount IS NOT NULL";
    }

    $result = $db->query($sql);

    $markers = array(); 
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $marker = array(
                'poi_id' => $row['poi_id'],
                'poi_name' => $row['poi_name'],
                'prod_name' => $row['prod_name'],
                'image_path' => $row['image_path'],
                'lat' => $row['lat'],
                'lng' => $row['lng'],
                'offer_id'=> $row['offer_id'],
                'discount' => $row['discount'],
                'date' => $row['date'],
                'likes' => $row['likes'],
                'dislikes' => $row['dislikes'],
                'stock' => $row['stock'],
                'category' => $row['category'],
                'subcategory' => $row['subcategory']
            );
            $markers[] = $marker;
        }
    }

    echo json_encode($markers);
?>
