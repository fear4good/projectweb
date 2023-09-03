<?php
    include '../connect.php';

    // Check if category and subcategory query parameters are provided
    $category = $_GET['category'] ?? null;
    $subcategory = $_GET['subcategory'] ?? null;

    // Build the SQL query based on whether category and subcategory are provided
    $sql = "SELECT p.id AS poi_id, p.name AS poi_name, p.latitude AS lat, p.longitude AS lng, 
                o.id AS offer_id, o.discount, o.date, o.likes, o.dislikes, o.stock,
                pr.name AS prod_name, pr.image_path AS image_path, 
                c.name AS category, 
                sc.name AS subcategory,
                u.username,
                t.tokens
            FROM pois p
            LEFT JOIN offers o ON p.id = o.supermarket_id
            LEFT JOIN products pr ON o.product_id = pr.id
            LEFT JOIN subcategories sc ON pr.subcategory_id = sc.id
            LEFT JOIN categories c ON sc.category_id = c.id
            LEFT JOIN users u ON o.user_id = u.id
            LEFT JOIN tokens t ON t.id = u.id";

    if ($category && $subcategory) {
        // Filter by both category and subcategory
        $sql .= " WHERE c.id = '$category' AND sc.id = '$subcategory' AND o.discount IS NOT NULL";
    } elseif ($category) {
        // Filter only by category
        $sql .= " WHERE c.id = '$category' AND o.discount IS NOT NULL";
    } elseif ($subcategory) {
        // Filter only by subcategory
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
                'user_prov' => $row['username'],
                'tokens' => $row['tokens'],
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
