var map = L.map('map').setView([38.2466, 21.7346], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.control.locate().addTo(map);

$.ajax({
    url: 'fetch_markers.php',
    dataType: 'json',
    success: function (data) {
        // Store the marker data globally
        var markerDataList = data;

        // Function to filter markers based on name
        function filterMarkers(name) {
            // Clear existing markers from the map
            map.eachLayer(function (layer) {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            // Filter the marker data based on the search name
            var filteredMarkers = markerDataList.filter(function (markerData) {
                return markerData.name && name && markerData.name.toLowerCase().includes(name.toLowerCase());

            });

            // Add filtered markers to the map
            filteredMarkers.forEach(function (markerData) {
                var name = markerData.name;
                var lat = markerData.lat;
                var lng = markerData.lng;

                var marker = L.marker([lat, lng]).addTo(map);
                marker.bindPopup(name);
            });
        }

        // Event listener for search button click
        $('#btn_search').on("click", function () {
            var searchName = $('#search').val();
            filterMarkers(searchName);
        });

        // Initial rendering of all markers
        filterMarkers('');
    }
});





