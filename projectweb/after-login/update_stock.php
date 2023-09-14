<?php 

include '../connect.php';

if ($_POST['type'] == 'add') {
    $offerid = $_POST['offerid'];
    // Increment the stock by 1
    $query = "UPDATE offers SET stock = stock + 1 WHERE id = $offerid";
    if (mysqli_query($db, $query)) {
        // Success
        $response = array('status' => 'success', 'message' => 'Stock updated successfully.');
        echo json_encode($response);
    } else {
        // Error
        $response = array('status' => 'error', 'message' => 'Error updating stock: ' . mysqli_error($db));
        echo json_encode($response);
    }
}

if ($_POST['type'] == 'remove') {
    $offerid = $_POST['offerid'];
    // Decrement the stock by 1
    $query = "UPDATE offers SET stock = stock - 1 WHERE id = $offerid";
    if (mysqli_query($db, $query)) {
        // Success
        $response = array('status' => 'success', 'message' => 'Stock updated successfully.');
        echo json_encode($response);
    } else {
        // Error
        $response = array('status' => 'error', 'message' => 'Error updating stock: ' . mysqli_error($db));
        echo json_encode($response);
    }
}

?>
