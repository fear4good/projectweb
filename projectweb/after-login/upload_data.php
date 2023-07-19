<?php
include '../connect.php';
$errorMsg1 = $errorMsg2 = '';


if (isset($_POST['buttonImportPois'])) {
    if ($_FILES['jsonFile']['error'] === UPLOAD_ERR_OK) {
        copy($_FILES['jsonFile']['tmp_name'], 'jsonFiles/' . $_FILES['jsonFile']['name']);
        $json = file_get_contents('jsonFiles/' . $_FILES['jsonFile']['name']);
        $pois = json_decode($json, true);

        $stmt = $db->prepare('INSERT INTO pois (id, city, house_number, postcode, street, brand, wikidata, wikipedia, name, opening_hours, operator, bitcoin_payment, cash_payment, coins_payment, credit_cards_payment, debit_cards_payment, mastercard_payment, visa_payment, phone, shop, website, longitude, latitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->bind_param('sssssssssssssssssssssss', $id, $city, $houseNumber, $postcode, $street, $brand, $wikidata, $wikipedia, $name, $openingHours, $operator, $bitcoinPayment, $cashPayment, $coinsPayment, $creditCardsPayment, $debitCardsPayment, $mastercardPayment, $visaPayment, $phone, $shop, $website, $longitude, $latitude);

        
        foreach ($pois['features'] as $feature) {
            $id = $feature['properties']['@id'];
            $city = isset($feature['properties']['addr:city']) ? $feature['properties']['addr:city'] : null;
            $houseNumber = isset($feature['properties']['addr:housenumber']) ? $feature['properties']['addr:housenumber'] : null;
            $postcode = isset($feature['properties']['addr:postcode']) ? $feature['properties']['addr:postcode'] : null;
            $street = isset($feature['properties']['addr:street']) ? $feature['properties']['addr:street'] : null;
            $brand = isset($feature['properties']['brand']) ? $feature['properties']['brand'] : null;
            $wikidata = isset($feature['properties']['brand:wikidata']) ? $feature['properties']['brand:wikidata'] : null;
            $wikipedia = isset($feature['properties']['brand:wikipedia']) ? $feature['properties']['brand:wikipedia'] : null;
            $name = isset($feature['properties']['name']) ? $feature['properties']['name'] : null;
            $openingHours = isset($feature['properties']['opening_hours']) ? $feature['properties']['opening_hours'] : null;
            $operator = isset($feature['properties']['operator']) ? $feature['properties']['operator'] : null;
            $bitcoinPayment = isset($feature['properties']['payment:bitcoin']) ? $feature['properties']['payment:bitcoin'] : null;
            $cashPayment = isset($feature['properties']['payment:cash']) ? $feature['properties']['payment:cash'] : null;
            $coinsPayment = isset($feature['properties']['payment:coins']) ? $feature['properties']['payment:coins'] : null;
            $creditCardsPayment = isset($feature['properties']['payment:credit_cards']) ? $feature['properties']['payment:credit_cards'] : null;
            $debitCardsPayment = isset($feature['properties']['payment:debit_cards']) ? $feature['properties']['payment:debit_cards'] : null;
            $mastercardPayment = isset($feature['properties']['payment:mastercard']) ? $feature['properties']['payment:mastercard'] : null;
            $visaPayment = isset($feature['properties']['payment:visa']) ? $feature['properties']['payment:visa'] : null;
            $phone = isset($feature['properties']['phone']) ? $feature['properties']['phone'] : null;
            $shop = isset($feature['properties']['shop']) ? $feature['properties']['shop'] : null;
            $website = isset($feature['properties']['website']) ? $feature['properties']['website'] : null;
            $longitude = $feature['geometry']['coordinates'][0];
            $latitude = $feature['geometry']['coordinates'][1];

            $stmt->execute();
        }
        $stmt->close();
    } else {
        $errorMsg1 = 'Error uploading the file. Please try again.';
    }
}


if (isset($_POST['buttonImportProd'])) {
    if ($_FILES['jsonFile']['error'] === UPLOAD_ERR_OK) {
        copy($_FILES['jsonFile']['tmp_name'], 'jsonFiles/' . $_FILES['jsonFile']['name']);
        $json = file_get_contents('jsonFiles/' . $_FILES['jsonFile']['name']);
        $data = json_decode($json, true);

        // Insert categories into the 'categories' table
        foreach ($data['categories'] as $category) {
            $category_id = $category['id'];
        
            $stmt = $db->prepare('SELECT id FROM categories WHERE id = ?');
            $stmt->bind_param('s', $category_id);
            $stmt->execute();
            $stmt->store_result();
        
            if ($stmt->num_rows == 0) {
                $stmt->close();
        
                $stmt = $db->prepare('INSERT INTO categories (id, name) VALUES (?, ?)');
                $stmt->bind_param('ss', $category_id, $category['name']);
                $stmt->execute();
                $stmt->close();
        

                // Insert subcategories into the 'subcategories' table
                foreach ($category['subcategories'] as $subcategory) {
                    $subcategory_id = $subcategory['uuid'];
                
                    $stmt = $db->prepare('SELECT id FROM subcategories WHERE id = ?');
                    $stmt->bind_param('s', $subcategory_id);
                    $stmt->execute();
                    $stmt->store_result();
                
                    if ($stmt->num_rows == 0) {
                        $stmt->close();
                
                        $stmt = $db->prepare('INSERT INTO subcategories (id, name, category_id) VALUES (?, ?, ?)');
                        $stmt->bind_param('sss', $subcategory_id, $subcategory['name'], $category['id']);
                        $stmt->execute();
                        $stmt->close();
                    } else {
                        $stmt->close();
                    }
                }
            }
        }

        // Insert products into the 'products' table
        foreach ($data['products'] as $product) {
            $id = $product['id'];
        
            $stmt = $db->prepare('SELECT id FROM products WHERE id = ?');
            $stmt->bind_param('s', $id);
            $stmt->execute();
            $stmt->store_result();
        
            if ($stmt->num_rows == 0) {
                $stmt->close();
        
                $stmt = $db->prepare('INSERT INTO products (id, name, category_id, subcategory_id) VALUES (?, ?, ?, ?)');
                $stmt->bind_param('ssss', $id, $product['name'], $product['category'], $product['subcategory']);
                $stmt->execute();
                $stmt->close();
            } else {
                $stmt->close();
            }
        }
    } else {
        $errorMsg2 = 'Error uploading the file. Please try again.';
    }
}
?>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>Import JSON File</title>
</head>
<body>
    <form method="POST" enctype="multipart/form-data">
        POIS JSON File <input type="file" name="jsonFile">
        <br>
        <input type="submit" value="Import" name="buttonImportPois">
    </form>
    <form method="POST" enctype="multipart/form-data">
        PRODUCTS AND CATEGORIES JSON File <input type="file" name="jsonFile">
        <br>
        <input type="submit" value="Import" name="buttonImportProd">
    </form>
    <li><a href="main.php">Main</a></li>
    <?php echo $errorMsg1, $errorMsg2 ; ?>
</body>

</html>
