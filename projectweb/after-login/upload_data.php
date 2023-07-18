<?php
include '../connect.php';
$errorMsg = '';

if (isset($_POST['buttonImport'])) {
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
        $errorMsg = 'Error uploading the file. Please try again.';
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
        JSON File <input type="file" name="jsonFile">
        <br>
        <input type="submit" value="Import" name="buttonImport">
    </form>
    <li><a href="main.php">Main</a></li>
    <?php echo $errorMsg; ?>
</body>

</html>
