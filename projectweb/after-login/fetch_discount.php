<?php

    include '../connect.php';

    $category_id = $_GET['category'];
    $subcategory_id = $_GET['subcategory'];

    if ($subcategory_id) {
        $products_query = "SELECT * FROM products WHERE category_id = ? AND subcategory_id = ?";
        $prod_prep = $db->prepare($products_query);
        $prod_prep->bind_param("ss", $category_id, $subcategory_id);
    } else {
        $products_query = "SELECT * FROM products WHERE category_id = ?";
        $prod_prep = $db->prepare($products_query);
        $prod_prep->bind_param("s", $category_id);
    }

    $prod_prep->execute();
    $prod_get = $prod_prep->get_result();

    $discounts = [];

    $start_last_week = date("Y-m-d", strtotime("-7 days"));
    $end_last_week = date("Y-m-d", strtotime("-1 days"));

    while($prod_result = $prod_get->fetch_assoc()){

        $avg_price_last_week_query = "SELECT AVG(price) as avg_price FROM price_history WHERE product_id = ? AND date BETWEEN ? AND ?";
        $avgweek = $db->prepare($avg_price_last_week_query);
        $avgweek->bind_param("sss", $prod_result['id'], $start_last_week, $end_last_week);
        $avgweek->execute();
        $result = $avgweek->get_result();
        $row = $result->fetch_assoc();
        $avg_price_last_week = $row['avg_price'];


        $offer_price_query = "SELECT discount FROM offers WHERE product_id = ? ORDER BY date DESC LIMIT 1";
        $offerStmt = $db->prepare($offer_price_query);
        $offerStmt->bind_param("s", $prod_result['id']);
        $offerStmt->execute();
        $offerResult = $offerStmt->get_result();

        if ($offerRow = $offerResult->fetch_assoc()) {
            $offer_price = $offerRow['discount'];

            if ($avg_price_last_week){
                $discount = (($avg_price_last_week - $offer_price) / $avg_price_last_week) * 100;
            }else { 
                $discount = 0; 
            }   
        } else {
            $discount = 0;
        }

        $discounts[] = $discount;  
    }

    $avgweek->close();
    $offerStmt->close();
    $prod_prep->close();

    echo json_encode($discounts);

?>






