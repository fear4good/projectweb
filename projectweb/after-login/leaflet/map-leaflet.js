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

// Function to fetch all markers from the server
function fetchAllMarkers() {
  $.ajax({
    url: "fetch_markers.php",
    dataType: "json",
    success: function (data) {
      // Store the data into the markerDataList variable
      markerDataList = data;

      // Call filterMarkers after fetching all markers to display them on the map
      filterMarkers("");
    },
    error: function (error) {
      console.error("Error fetching all markers:", error);
    }
  });
}

$(document).ready(function() {
  let data; // Declare the data variable in a higher scope to make it accessible to other functions

  function populateSubcategories(selectedCategory) {
    const subcategoryDropdown = $("#subcategory-dropdown");
    subcategoryDropdown.empty().prop("disabled", true);

    // Find the selected category and populate its subcategories
    const selectedCategoryData = data.find(category => category.category_id === selectedCategory);
    if (selectedCategoryData && selectedCategoryData.subcategories.length > 0) {
      selectedCategoryData.subcategories.forEach(function(subcategory) {
        const subOption = $("<option>").text(subcategory.subcategory_name).val(subcategory.subcategory_id);
        subcategoryDropdown.append(subOption);
      });
      subcategoryDropdown.prop("disabled", false);
    }

    // Enable the submit button when both category and subcategory are selected
    enableSubmitButton();
  }
  
  // Function to populate categories and subcategories
  $.ajax({
    url: "fetch_categories.php",
    method: "GET",
    dataType: "json",
    success: function(response) {
      data = response; // Assign the retrieved data to the variable in the higher scope
      const categoryDropdown = $("#category-dropdown");
      const subcategoryDropdown = $("#subcategory-dropdown");

      data.forEach(function(category) {
        const option = $("<option>").text(category.category_name).val(category.category_id);
        categoryDropdown.append(option);
      });

      // Trigger the change event on category dropdown to populate subcategories initially if a category is pre-selected
      categoryDropdown.trigger("change");
    },
    error: function(error) {
      console.error("Error retrieving categories and subcategories:", error);
    }
  });

  // Function to populate subcategories based on the selected category


  function enableSubmitButton() {
    const selectedCategory = $("#category-dropdown").val();
    const selectedSubcategory = $("#subcategory-dropdown").val();
    const isCategorySelected = selectedCategory !== "";
    const isSubcategorySelected = selectedSubcategory !== "";

    // Enable the submit button only when both category and subcategory are selected
    $("#submit-button").prop("disabled", !(isCategorySelected && isSubcategorySelected));
  }

  // Enable the subcategory dropdown when a category is selected
  $("#category-dropdown").change(function () {
    const selectedCategory = $(this).val();

    // Populate subcategories based on the selected category
    populateSubcategories(selectedCategory);
  });

  // Enable the submit button when a subcategory is selected
  $("#subcategory-dropdown").change(function () {
    enableSubmitButton();
  });

  // Implement the click event for the submit button to perform the database search
  $("#submit-button").click(function () {
    const selectedCategory = $("#category-dropdown").val();
    const selectedSubcategory = $("#subcategory-dropdown").val();

    // If both category and subcategory are selected, filter the markers based on the selection
    // Otherwise, fetch all markers from the server
    if (selectedCategory && selectedSubcategory) {
      $.ajax({
        url: "fetch_markers.php",
        method: "GET",
        dataType: "json",
        data: {
          category: selectedCategory,
          subcategory: selectedSubcategory,
        },
        success: function (data) {
          // Store the data into the markerDataList variable
          markerDataList = data;

          // Call filterMarkers to display the filtered markers
          filterMarkers("");
        },
        error: function (error) {
          console.error("Error fetching markers:", error);
        },
      });
    } else {
      fetchAllMarkers();
    }
  });

  // Event handler for the Clear button
  $("#clear-button").click(function () {
    // Clear both category and subcategory dropdown selections
    $("#category-dropdown").val("");
    $("#subcategory-dropdown").val("").prop("disabled", true);

    // Disable the Submit button after clearing
    $("#submit-button").prop("disabled", true);

    // Fetch all markers again after clearing to display all supermarkets
    fetchAllMarkers();
  });
});