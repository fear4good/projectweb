<?php
session_start();

$is_admin = false;

if (isset($_SESSION['loggedin'])) {
    if ($_SESSION['role'] == 'admin') {
        $is_admin = true;
    }
} else {
    header('Location: ../index');
    exit();
}

?>

<!DOCTYPE html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>  
    <title>Welcome</title>
    <link rel="stylesheet" href="font-awesome-4.7.0/css/font-awesome.css">
    <link rel="stylesheet" href="website-style.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    <link href="https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.79.0/dist/L.Control.Locate.min.css" rel="stylesheet">
    <link rel="stylesheet" href="leaflet/dist/css/leaflet.extra-markers.min.css">
</head>
<body>
    <ul>
        <li><a href="logout.php">Logout</a></li>
        <li><a href="profile.html">Profile</a></li>
        <li class = "left"><a >Hi, <?php echo htmlspecialchars($_SESSION["username"]); ?></a></li>
        <li>
            <form autocomplete="off" method="POST" id="search-form" onsubmit="return false;"> 
                <input type="text" id="search" placeholder="Search..."> <style> #search{margin-top:13px;}</style>
                <button type="button" id="btn_search">Search</button>
            </form>
        </li>
        <?php if ($is_admin): ?><li><a href="upload_data.php">Admin Settings</a></li><?php endif; ?>
        <li>
            <div class="dropdown-container">
                <select id="category-dropdown">
                <option value="">Select Category</option>
                </select>
                
                <select id="subcategory-dropdown" disabled>
                    <option value="">Select Subcategory</option>
                </select>

                <button id="submit-button" disabled>Submit</button>
                <button id="clear-button">Clear</button>
            </div>
        </li>
    </ul>

    <div id="map"></div>
</body>
</html>

<script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
<script src="https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.79.0/dist/L.Control.Locate.min.js"></script>
<script src="leaflet/map-leaflet.js"></script>
<script src="leaflet/dist/js/leaflet.extra-markers.min.js"></script>