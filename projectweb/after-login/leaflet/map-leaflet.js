var map = L.map('map');

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Find location through latlng
map.locate({ setView: true, maxZoom: 11 });

function onLocationFound(e) {
    L.marker(e.latlng).addTo(map).bindPopup("You are here").openPopup();
  }
  

function onLocationError(e) {
  alert(e.message);
}
  
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

L.control.locate().addTo(map);

var markerDataList = [];

var isAdmin = false;
var username = '';

fetch('../pre-login/fetch_credentials.php') // Obtain role for admin settings
  .then(response => response.json())
  .then(data => {
    username = data.username;
    isAdmin = data.role === 'admin';


    const welcomeUsernameSpan = document.getElementById('welcome-username');
    welcomeUsernameSpan.textContent = username;

    const adminSettingsLi = document.getElementById('admin-settings-li');

    if (isAdmin) {
      adminSettingsLi.style.display = 'block';
    }
  })
  .catch(error => {
    console.error('Error fetching data', error);
  });



var userLocationMarker = null;

// Main function to handle markers
function filterMarkers(name) {
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker && layer.getPopup() && layer.getPopup().getContent() === "You are here") {
      userLocationMarker = layer;
    }
  });

  if(userLocationMarker){
    map.eachLayer(function (layer) {
      if (layer instanceof L.Marker && layer !== userLocationMarker) {
        map.removeLayer(layer);
      }
    });

    var filteredMarkers = markerDataList.filter(function (markerData) {
      if (name === '') {
        return markerData.discount;
      } else {
        return markerData.poi_name && markerData.poi_name.toLowerCase().includes(name.toLowerCase());
      }
    });

    // Function to add content in popups
    function generatePopupContent(markerData) {
      let popupContent = '';
      
      const keyToLabel = {
        poi_name: 'Market Name',
        prod_name: 'Product',
        discount: 'Discount',
        date: 'Date',
        stock: 'Stock',
        category: 'Category',
        subcategory: 'Subcategory',
        likes: `<i class="fa fa-thumbs-up" data-offer-id="${markerData.offer_id}"></i> <span class="likes">${markerData.likes}</span>`,
        dislikes: `<i class="fa fa-thumbs-down" data-offer-id="${markerData.offer_id}"></i> <span class="dislikes">${markerData.dislikes}</span>`
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
      } else {
        for (const key in keyToLabel) {
          if (markerData.hasOwnProperty(key)) {
            const label = keyToLabel[key];
            const value = markerData[key];
            if (key === 'likes' || key === 'dislikes') {
              popupContent += `${label}&nbsp`;
            } else if (key === 'stock') {
              var stockStatus = value > 0 ? 'Yes' : 'No';
              popupContent += 'Stock: ' + stockStatus + '<br>';
            } else {
              popupContent += `<strong>${label}:</strong> ${value}<br>`;
            }
          }
        }
        if(distanceToOffer<= 1000000){
          var externalSiteLink = '<a href="#" class="review-link" data-marker-data="' + encodeURIComponent(JSON.stringify(markerData.poi_id)) + '" target="_blank">Review</a>';
          popupContent += '<br>' + externalSiteLink;
        }
      }
      if (distanceToOffer <= 10000000){
        var externalSiteLink2 = '<a href="#" class="add-offer-link" data-marker-id="' + encodeURIComponent(JSON.stringify(markerData.poi_id)) + '" target="_blank">Add Offer</a>';
        popupContent += '<br>' + externalSiteLink2;
      }
      if (isAdmin) {
        popupContent += '<br><button class="delete-offer-button" data-offer-id="' + markerData.offer_id + '">Delete offer</button>';
      }

      popupContent += '</div>';
    
      return popupContent;
    }

    const groupedOffers = {};

    // Handling popup content for each marker
    filteredMarkers.forEach(function(markerData) {
      if (!groupedOffers[markerData.poi_id]) {
        groupedOffers[markerData.poi_id] = [];
      }
      groupedOffers[markerData.poi_id].push(markerData);
    });

    for (const poi_id in groupedOffers) {
      const offersAtLocation = groupedOffers[poi_id];

      const firstOfferDiscount = offersAtLocation[0].discount;
      var markerColor = firstOfferDiscount ? 'green' : 'red';
      var markerIcon = L.ExtraMarkers.icon({
        markerColor: markerColor,
      });

      let popupContent = '';
      offersAtLocation.forEach(function(markerData) {
        popupContent += generatePopupContent(markerData);
      });

      const firstOffer = offersAtLocation[0];

      L.marker([parseFloat(firstOffer.lat), parseFloat(firstOffer.lng)], { icon: markerIcon })
        .bindPopup(popupContent)
        .addTo(map);
    }
    
  }else{
    console.error("Error finding position");
    document.location.reload;
  }
}

// Event listener for review
$(document).on('click', '.review-link', function (e) {
  e.preventDefault();
  var markerid = JSON.parse(decodeURIComponent($(this).data('marker-data')));

  var reviewUrl = 'review.html';
  var newWindow = window.open(reviewUrl, '_blank');
  var reviewOfferLinkUrl = 'review.html?marketid=' + encodeURIComponent(JSON.stringify(markerid));
  newWindow.location = reviewOfferLinkUrl;
});


//event listener for add offer
$(document).on('click', '.add-offer-link', function (e) {
  e.preventDefault();

  var markerid = JSON.parse(decodeURIComponent($(this).data('marker-id')));
  var addOfferUrl = 'add_offer.html';
  var newWindow = window.open(addOfferUrl, '_blank');

  var addOfferLinkUrl = 'add_offer.html?marketid=' + encodeURIComponent(JSON.stringify(markerid));
  newWindow.location = addOfferLinkUrl;
});


//Event listener for admin delete offer
$(document).on('click', '.delete-offer-button', function () {
  var deleteofferId = $(this).attr('data-offer-id');
  var confirmation = confirm("Are you sure you want to delete this offer?");
  if (confirmation) {
      $.ajax({
          type: 'POST',
          url: 'delete_offer.php',
          data: { offer_id: deleteofferId },
          dataType: 'json',
          success: function (response) {
              if (response.success) {
                  alert('Offer deleted successfully!');
              } else {
                  console.error('Error deleting offer:', response.error);
              }

              map.closePopup();
              location.reload();
          },
          error: function (xhr, status, error) {
              console.error('AJAX Error:', error);
          }
      });
  }
});


// Initiate search
$('#btn_search').on("click", function () {
  var searchName = $('#search').val();
  filterMarkers(searchName);
});

function fetchAllMarkers() {
  $.ajax({
    url: "fetch_markers.php",
    dataType: "json",
    success: function (data) {
      markerDataList = data;
      filterMarkers("");
    },
    error: function (error) {
      console.error("Error fetching all markers:", error);
    }
  });
}

// Get Categories
$(document).ready(function() {

  let data;

  $.ajax({
    url: "fetch_categories.php",
    method: "GET",
    dataType: "json",
    success: function(response) {
      data = response;
      const categoryDropdown = $("#category-dropdown");

      data.sort((a, b) => a.category_name.localeCompare(b.category_name));

      data.forEach(function(category) {
        const option = $("<option>").text(category.category_name).val(category.category_id);
        categoryDropdown.append(option);
      });

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

    const selectedCategoryData = data.find(category => category.category_id === selectedCategory);
    if (selectedCategoryData && selectedCategoryData.subcategories.length > 0) {
      selectedCategoryData.subcategories.sort((a, b) => a.subcategory_name.localeCompare(b.subcategory_name));

      selectedCategoryData.subcategories.forEach(function(subcategory) {
        const subOption = $("<option>").text(subcategory.subcategory_name).val(subcategory.subcategory_id);
        subcategoryDropdown.append(subOption);
      });
      subcategoryDropdown.prop("disabled", false);
    }

    // Enable the submit button
    enableSubmitButton();
  }

  // Function for submit button logic
  function enableSubmitButton() {
    const selectedCategory = $("#category-dropdown").val();
    const selectedSubcategory = $("#subcategory-dropdown").val();
    const isCategorySelected = selectedCategory !== "";
    const isSubcategorySelected = selectedSubcategory !== "";

    $("#submit-button").prop("disabled", !(isCategorySelected && isSubcategorySelected));
  }

  $("#category-dropdown").change(function () {
    const selectedCategory = $(this).val();

    populateSubcategories(selectedCategory);
  });

  $("#subcategory-dropdown").change(function () {
    enableSubmitButton();
  });

  $("#submit-button").click(function () {
    const selectedCategory = $("#category-dropdown").val();
    const selectedSubcategory = $("#subcategory-dropdown").val();

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
          markerDataList = data;
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
    $("#category-dropdown").val("");
    $("#subcategory-dropdown").val("").prop("disabled", true);

    $("#submit-button").prop("disabled", true);

    fetchAllMarkers();
  });

  fetchAllMarkers();
});

// Event listeners to like and dislike icons
$(document).on('click', '.fa-thumbs-up', function () {
  var offerId = $(this).data('offer-id');
  var likesCountElement = $(this).siblings('.likes');

  $.ajax({
    url: 'upd_likes.php',
    method: 'POST',
    data: {
      offer_id: offerId,
      action: 'like',
    },
    dataType: 'json',
    success: function (response) {
      likesCountElement.text(response.likes);
      $.ajax({
        url: 'save_like_history.php',
        method: 'POST',
        data: {
          offer_id: offerId,
          likes: 1,
          dislikes: 0,
        },
        dataType: 'json',
        success: function () {
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

  $.ajax({
    url: 'upd_likes.php',
    method: 'POST',
    data: {
      offer_id: offerId,
      action: 'dislike',
    },
    dataType: 'json',
    success: function (response) {
      dislikesCountElement.text(response.dislikes);
      $.ajax({
        url: 'save_like_history.php',
        method: 'POST',
        data: {
          offer_id: offerId,
          likes: 0,
          dislikes: 1,
        },
        dataType: 'json',
        success: function () {
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
