<?php
include '../connect.php';
$errorMsg1 = $errorMsg2 = '';


if (isset($_POST['buttonImportPois'])) {
    if ($_FILES['jsonFile']['error'] === UPLOAD_ERR_OK) {
        copy($_FILES['jsonFile']['tmp_name'], 'jsonFiles/' . $_FILES['jsonFile']['name']);
        $json = file_get_contents('jsonFiles/' . $_FILES['jsonFile']['name']);
        $pois = json_decode($json, true);

        $stmt = $db->prepare('INSERT INTO pois (id, city, house_number, postcode, street, brand, wikidata, wikipedia, name, opening_hours, operator, bitcoin_payment, cash_payment, coins_payment, credit_cards_payment, debit_cards_payment, mastercard_payment, visa_payment, phone, shop, website, longitude, latitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->bind_param('sssdd', $id, $name, $shop, $longitude, $latitude);

        
        foreach ($pois['features'] as $feature) {
            $id = $feature['properties']['@id'];
            $name = isset($feature['properties']['name']) ? $feature['properties']['name'] : null;
            $shop = isset($feature['properties']['shop']) ? $feature['properties']['shop'] : null;
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
        $errorMsg2 = 'Αποτυχία υποβολής αρχείου. Παρακαλώ προσπαθήστε ξανά.';
    }
}
?>
