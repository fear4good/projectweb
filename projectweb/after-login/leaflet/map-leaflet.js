var map = L.map('map').setView([38.2466, 21.7346], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// map.locate({ setView: true, watch: true, maxZoom: 16 });
// function onLocationFound(e) {
//     var radius = e.accuracy / 2;
  
//     L.marker(e.latlng).addTo(map).bindPopup("You are here").openPopup();
//     L.circle(e.latlng, radius).addTo(map);
//   }
  
//   // Handle location error event
//   function onLocationError(e) {
//     alert(e.message);
//   }
  
//   // Listen for location found and error events
//   map.on('locationfound', onLocationFound);
//   map.on('locationerror', onLocationError);

L.control.locate().addTo(map);


$.ajax({
    url: 'fetch_markers.php',
    dataType: 'json',
    success: function (data) {
        
        // var filteredMarkers = data;
        // function filterMarkers(name) {
        //     map.eachLayer(function (layer) {
        //         if (layer instanceof L.Marker) {
        //             map.removeLayer(layer);
        //         }
        //     });

        //     var filteredMarkers = markerDataList.filter(function (markerData) {
        //         return markerData.name && markerData.name.toLowerCase().includes(name.toLowerCase());
        //     });

        //     $('#btn_search').on("click", function () {
        //         var searchName = $('#search').val();
        //         filterMarkers(searchName);
        //     });
          
        var markerDataList = data;
        var greenMarkers = [];
        var redMarkers = [];

        markerDataList.forEach(function (markerData) {
            var poi_name = markerData.poi_name;
            var prod_name = markerData.name;
            var lat = markerData.lat;
            var lng = markerData.lng;
            var discount = markerData.discount;

            var markerIcon = discount ? L.ExtraMarkers.icon({
                markerColor: 'green', // Set the marker color to green for supermarkets with offers
            }) : L.ExtraMarkers.icon({
                markerColor: 'red', // Set the marker color to red for supermarkets without offers
            });

            var marker = L.marker([lat, lng], { icon: markerIcon });

            // Use a different condition to handle the popup content
            if (discount) {
                marker.bindPopup(poi_name + '<br>' + prod_name + '<br>Discount: ' + discount);
                greenMarkers.push(marker);
            } else {
                marker.bindPopup(poi_name);
                redMarkers.push(marker);
            }
        });

        // Add the red markers first to maintain the order on the map
        redMarkers.forEach(function (marker) {
            marker.addTo(map);
        });

        greenMarkers.forEach(function (marker) {
            marker.addTo(map);
        });
    //}
    // filterMarkers('');   
    }
});







