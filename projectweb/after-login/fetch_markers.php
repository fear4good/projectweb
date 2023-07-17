<?php
    include '../connect.php';

    $markers = array(); 
    $sql = "SELECT name, latitude, longitude FROM pois";
    $result = $db->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $marker = array(
                'name' => $row['name'],
                'lat' => $row['latitude'],
                'lng' => $row['longitude']
            );
            $markers[] = $marker;
        }
    }

    echo json_encode($markers);
?>