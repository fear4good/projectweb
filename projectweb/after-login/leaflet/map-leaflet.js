var map = L.map('map').setView([38.2466, 21.7346], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.locate({ setView: true,/* watch: true,*/ maxZoom: 16 });
function onLocationFound(e) {
    var radius = e.accuracy / 2;
  
    L.marker(e.latlng).addTo(map).bindPopup("You are here").openPopup();
    L.circle(e.latlng, radius).addTo(map);
  }
  
  // Handle location error event
  function onLocationError(e) {
    alert(e.message);
  }
  
  // Listen for location found and error events
  map.on('locationfound', onLocationFound);
  map.on('locationerror', onLocationError);

L.control.locate().addTo(map);


var markerDataList = [];

// Define the filterMarkers function outside the AJAX success function
function filterMarkers(name) {
    // Remove all markers from the map
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // If the search name is empty, filter the markers to include only those with a discount
    // Otherwise, filter the markers based on the search name
    var filteredMarkers = markerDataList.filter(function (markerData) {
        if (name === '') {
            return markerData.discount;
        } else {
            return markerData.poi_name && markerData.poi_name.toLowerCase().includes(name.toLowerCase());
        }
    });

    // Add the filtered markers to the map
    filteredMarkers.forEach(function (markerData) {
        var markerColor = markerData.discount ? 'green' : 'red';
        var markerIcon = L.ExtraMarkers.icon({
            markerColor: markerColor,
        });
        L.marker([markerData.lat, markerData.lng], { icon: markerIcon })
            .bindPopup(markerData.poi_name + '<br>' + markerData.name + (markerData.discount ? ('<br>Discount: ' + markerData.discount) : ''))
            .addTo(map);
    });
}



// Define the click event handler for the #btn_search button outside the filterMarkers function
$('#btn_search').on("click", function () {
    var searchName = $('#search').val();
    filterMarkers(searchName);
});

//Na do gia na antikatastiso ta pano 
$('#btn_search').on("click", function () {
    var searchName = $('#search').val();
    var selectedCategory = $('#category_select').val();
    filterMarkers(searchName, selectedCategory);
});

$('#category_select').on("change", function () {
    var searchName = $('#search').val();
    var selectedCategory = $('#category_select').val();
    filterMarkers(searchName, selectedCategory);
});

function filterMarkers(name, category) {
    // Remove all markers from the map
    for(var i = 0; i < markers.length; i++){
        map.removeLayer(markers[i]);
    }

    // Filter the markers based on the search name, the selected category, and whether they have a discount
    for (var i = 0; i < markerList.length; i++) {
        var marker = markerList[i];
        var markerName = marker.name.toLowerCase();
        var markerCategory = marker.category.toLowerCase();
        var markerHasDiscount = marker.discount > 0;

        if ((name === "" || markerName.includes(name.toLowerCase())) &&
            (category === "" || markerCategory.includes(category.toLowerCase())) &&
            (name !== "" || markerHasDiscount)) {
            var markerColor = markerHasDiscount ? 'green' : 'red';
            var markerIcon = L.ExtraMarkers.icon({
                markerColor: markerColor,
            });
            markers.push(L.marker([marker.lat, marker.lng], {icon: markerIcon}).addTo(map));
        }
    }
}




$.ajax({
    url: 'fetch_markers.php',
    dataType: 'json',
    success: function (data) {
        // Store the data into the markerDataList variable
        markerDataList = data;

        // Call filterMarkers after you've fetched and processed the marker data
        filterMarkers('');
    }
});







