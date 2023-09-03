<?php session_start(); ?>

<!DOCTYPE html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>  
    <title>Welcome</title>
    <link rel="stylesheet" href="font-awesome-4.7.0/css/font-awesome.css">
    <link rel="stylesheet" href="main.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    <link href="https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.79.0/dist/L.Control.Locate.min.css" rel="stylesheet">
    <link rel="stylesheet" href="leaflet/dist/css/leaflet.extra-markers.min.css">
</head>
<body>
    <div class="navbar">
        <div class="navbar-left">
                <a href="main.php">
                    <img src="leaflet/images/return_icon.png" alt="Return to Main" class="return-icon">
                </a>
                <a>Καλωσορίσατε, <span id="welcome-username"></span></a>
        </div>

        <div class="navbar-center">
            <form autocomplete="off" method="POST" id="search-form" onsubmit="return false;"> 
                <input type="text" id="search" placeholder="Search...">
                <button type="button" id="btn_search">Search</button>
            </form>

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
        </div>

        <div class="navbar-right">
            <li id="admin-settings-li" style="display: none;"><a href="admin_settings.html">
                <img src="leaflet/images/admin_settings.png" alt="Admin Settings Picture" class="admin-settings-picture">
                </a>
            </li>
            <a id="profile" href="profile.html">
                <img src="leaflet/images/profile_picture.jpg" alt="Profile Picture" class="profile-picture">
            </a>
            <a id="logout" href="logout.php">
                <img src="leaflet/images/logout_icon.png" alt="Logout" class="logout-icon">
            </a>
        </div>
    </div>

    <div id="map"></div>
    
</body>
</html>

<script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
<script src="https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.79.0/dist/L.Control.Locate.min.js"></script>
<script src="leaflet/map-leaflet.js"></script>
<script src="leaflet/dist/js/leaflet.extra-markers.min.js"></script>