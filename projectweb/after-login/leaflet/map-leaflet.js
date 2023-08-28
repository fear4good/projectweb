var map = L.map('map');

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.locate({ setView: true, maxZoom: 11 });

function onLocationFound(e) {
    L.marker(e.latlng).addTo(map).bindPopup("You are here").openPopup();
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

var isAdmin = false;
fetch('../pre-login/fetch_credentials.php')
  .then(response => response.json())
  .then(data => {
    isAdmin = data.role === 'admin';
  })
  .catch(error => {
      console.error('Error fetching role', error);
  });

var userLocationMarker = null;

// Define the filterMarkers function outside the AJAX success function
function filterMarkers(name) {
  // Get the user location marker if it exists
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker && layer.getPopup() && layer.getPopup().getContent() === "You are here") {
      userLocationMarker = layer;
    }
  });

  if(userLocationMarker){
    // Remove only the supermarket markers from the map
    map.eachLayer(function (layer) {
      if (layer instanceof L.Marker && layer !== userLocationMarker) {
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

    function generatePopupContent(markerData) {
      let popupContent = '';
      
      const keyToLabel = {
        poi_name: 'Market Name',
        prod_name: 'Product',
        user_prov: 'Provider',
        discount: 'Discount',
        likes: `<i class="fa fa-thumbs-up" data-offer-id="${markerData.offer_id}"></i> <span class="likes">${markerData.likes}</span>`,
        dislikes: `<i class="fa fa-thumbs-down" data-offer-id="${markerData.offer_id}"></i> <span class="dislikes">${markerData.dislikes}</span>`,
        stock: 'Stock',
        category: 'Category',
        subcategory: 'Subcategory'
      };
    
      const OnlyNamekeyToLabel = {
        poi_name: 'Market Name'
      };
    
      var offerLatLng = L.latLng(markerData.lat, markerData.lng);
      var distanceToOffer = userLocationMarker.getLatLng().distanceTo(offerLatLng);

      popupContent += '<div class="popup-content">';
      if (!markerData.discount) {
        for (const key in OnlyNamekeyToLabel) {
          if (markerData.hasOwnProperty(key)) {
            const label = keyToLabel[key];
            const value = markerData[key];
            popupContent += `<strong>${label}:</strong> ${value}<br>`;
          }
        }
        if (distanceToOffer <= 10000000){
          var externalSiteLink2 = '<a href="#" class="add-offer-link" data-marker-id="' + encodeURIComponent(JSON.stringify(markerData.poi_id)) + '" target="_blank">Προσθήκη Προσφοράς</a>';
          popupContent += '<br>' + externalSiteLink2;
        }
      } else {
        for (const key in keyToLabel) {
          if (markerData.hasOwnProperty(key)) {
            const label = keyToLabel[key];
            const value = markerData[key];
            if (key === 'likes' || key === 'dislikes') {
              popupContent += `${label}<br>`;
            } else if (key === 'stock') {
              var stockStatus = value > 0 ? 'Yes' : 'No';
              popupContent += 'Stock: ' + stockStatus + '<br>';
            } else {
              popupContent += `<strong>${label}:</strong> ${value}<br>`;
            }
          }
        }
        if(distanceToOffer<= 1000000){
          var externalSiteLink = '<a href="#" class="review-link" data-marker-data="' + encodeURIComponent(JSON.stringify(markerData)) + '" target="_blank">Αξιολόγηση</a>';
          popupContent += '<br>' + externalSiteLink;
        }
      }
      if (isAdmin) {
        popupContent += '<br><button class="delete-offer-button" data-offer-id="' + markerData.offer_id + '">Delete offer</button>';
      }

      popupContent += '</div>';
    
      return popupContent;
    }

    // Create an object to store grouped offers
    const groupedOffers = {};

    // Group the offers by poi_id
    filteredMarkers.forEach(function(markerData) {
      if (!groupedOffers[markerData.poi_id]) {
        groupedOffers[markerData.poi_id] = [];
      }
      groupedOffers[markerData.poi_id].push(markerData);
    });

    // Iterate through grouped offers and create markers with consolidated popup content
    for (const poi_id in groupedOffers) {
      const offersAtLocation = groupedOffers[poi_id];

      // Set token count for the first offer in the group
      $('.tokens').text(offersAtLocation[0].tokens);

      // Determine marker color based on the discount of the first offer in the group
      const firstOfferDiscount = offersAtLocation[0].discount;
      var markerColor = firstOfferDiscount ? 'green' : 'red';
      var markerIcon = L.ExtraMarkers.icon({
        markerColor: markerColor,
      });



      // Generate consolidated popup content for all offers at this location
      let popupContent = '';
      offersAtLocation.forEach(function(markerData) {
        popupContent += generatePopupContent(markerData);
      });

      // Use the latitude and longitude of the first offer at this location
      const firstOffer = offersAtLocation[0];

      L.marker([parseFloat(firstOffer.lat), parseFloat(firstOffer.lng)], { icon: markerIcon })
        .bindPopup(popupContent)
        .addTo(map);
    }
    
  }else{
    console.log("User location marker not found."); // Log the error for debugging
  }
}

// Event listener for the "Αξιολόγηση" link
$(document).on('click', '.review-link', function (e) {
  e.preventDefault();
  var markerData = JSON.parse(decodeURIComponent($(this).data('marker-data')));

  // Open a new window (or tab) with the review.html page and pass the markerData as a custom object
  var reviewUrl = 'review.html';
  var newWindow = window.open(reviewUrl, '_blank');
  // Pass the markerData to the review.html page through the newly opened window
  newWindow.markerData = markerData;
});


//event listener for the «Προσθήκη Προσφοράς» link
$(document).on('click', '.add-offer-link', function (e) {
  e.preventDefault();
  var markerid = JSON.parse(decodeURIComponent($(this).data('marker-id')));

  // Open a new window (or tab) with the review.html page and pass the markerData as a custom object
  var addOfferUrl = 'add_offer.html';
  var newWindow1 = window.open(addOfferUrl, '_blank');
  // Pass the markerData to the review.html page through the newly opened window
  newWindow1.markerid = markerid;
});

$(document).on('click', '.delete-offer-button', function () {
  var deleteofferId = $(this).attr('data-offer-id');
  var confirmation = confirm("Are you sure you want to delete this offer?");
  if (confirmation) {
      // Perform the jQuery POST request to delete the offer
      $.ajax({
          type: 'POST',
          url: 'delete_offer.php',
          data: { offer_id: deleteofferId },
          dataType: 'json',
          success: function (response) {
              // Handle the response here
              if (response.success) {
                  // Show a success message to the user
                  alert('Offer deleted successfully!');
              } else {
                  console.error('Error deleting offer:', response.error);
              }

              // Close the popup after deletion
              map.closePopup();
              location.reload();
          },
          error: function (xhr, status, error) {
              console.error('AJAX Error:', error);
          }
      });
  }
});


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

  // Function to populate categories and subcategories
  $.ajax({
    url: "fetch_categories.php",
    method: "GET",
    dataType: "json",
    success: function(response) {
      data = response; // Assign the retrieved data to the variable in the higher scope
      const categoryDropdown = $("#category-dropdown");
      const subcategoryDropdown = $("#subcategory-dropdown");

      // Sort the data array alphabetically based on category_name
      data.sort((a, b) => a.category_name.localeCompare(b.category_name));

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
  function populateSubcategories(selectedCategory) {
    const subcategoryDropdown = $("#subcategory-dropdown");
    subcategoryDropdown.empty().prop("disabled", true);

    // Find the selected category and populate its subcategories
    const selectedCategoryData = data.find(category => category.category_id === selectedCategory);
    if (selectedCategoryData && selectedCategoryData.subcategories.length > 0) {
      // Sort the subcategories array alphabetically based on subcategory_name
      selectedCategoryData.subcategories.sort((a, b) => a.subcategory_name.localeCompare(b.subcategory_name));

      selectedCategoryData.subcategories.forEach(function(subcategory) {
        const subOption = $("<option>").text(subcategory.subcategory_name).val(subcategory.subcategory_id);
        subcategoryDropdown.append(subOption);
      });
      subcategoryDropdown.prop("disabled", false);
    }

    // Enable the submit button when both category and subcategory are selected
    enableSubmitButton();
  }

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

  // Fetch all markers on initial page load
  fetchAllMarkers();
});

// Add click event listeners to like and dislike icons
$(document).on('click', '.fa-thumbs-up', function () {
  var offerId = $(this).data('offer-id');
  var likesCountElement = $(this).siblings('.likes');

  // Send AJAX request to update the likes count on the server
  $.ajax({
    url: 'upd_likes.php', // Replace with the actual server-side script for updating likes
    method: 'POST', // Use POST or GET depending on your server-side script requirements
    data: {
      offer_id: offerId,
      action: 'like', // Indicate the action to perform (like or dislike)
    },
    dataType: 'json',
    success: function (response) {
      // Update the likes count on the frontend with the response from the server
      likesCountElement.text(response.likes);
      $.ajax({
        url: 'save_like_history.php', // Replace with the actual server-side script for saving like history
        method: 'POST', // Use POST or GET depending on your server-side script requirements
        data: {
          offer_id: offerId,
          likes: 1,
          dislikes: 0,
        },
        dataType: 'json',
        success: function (saveResponse) {
          console.log('like history saved') ;

        },
        error: function (saveError) {
          console.error('Error saving like history:', saveError);
        }
      });
    },
    error: function (error) {
      console.error('Error updating likes:', error);
    }
  });
});

$(document).on('click', '.fa-thumbs-down', function () {
  var offerId = $(this).data('offer-id');
  var dislikesCountElement = $(this).siblings('.dislikes');

  // Send AJAX request to update the dislikes count on the server
  $.ajax({
    url: 'upd_likes.php', // Replace with the actual server-side script for updating dislikes
    method: 'POST', // Use POST or GET depending on your server-side script requirements
    data: {
      offer_id: offerId,
      action: 'dislike', // Indicate the action to perform (like or dislike)
    },
    dataType: 'json',
    success: function (response) {
      // Update the dislikes count on the frontend with the response from the server
      dislikesCountElement.text(response.dislikes);
      $.ajax({
        url: 'save_like_history.php', // Replace with the actual server-side script for saving like history
        method: 'POST', // Use POST or GET depending on your server-side script requirements
        data: {
          offer_id: offerId,
          likes: 0,
          dislikes: 1,
        },
        dataType: 'json',
        success: function (saveResponse) {
          console.log('dislike history saved');

        },
        error: function (saveError) {
          console.error('Error saving like history:', saveError);
        }
      });
    },
    error: function (error) {
      console.error('Error updating dislikes:', error);
    }
  });
});

