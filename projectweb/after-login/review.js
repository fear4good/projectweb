$(document).ready(function() {
  // Access the markerData object from the newly opened window
  var markerData = window.markerData;

  // Function to create a single offer entry HTML element
  function createOfferEntry(offerData) {
    var offerId = offerData.offer_id;

    // Create the main offer ID element
    var offerEntry = $('<div class="offer-entry">');
    var offerIdElement = $('<div class="offer-id">' + offerId + '</div>');

    // Create the details container for each offer
    var offerDetails = $('<div class="offer-details">');

    // Array to store the properties in the desired order
    var propertyOrder = ['poi_name', 'prod_name', 'discount', 'date', 'stock', 'category', 'subcategory','user_prov', 'tokens'];

    var propertyDisplayNames = {
      poi_name: 'Point of Interest',
      prod_name: 'Product Name',
      discount: 'Discount (%)',
      date: 'Offer Date',
      stock: 'Stock',
      category: 'Category',
      subcategory: 'Subcategory',
      user_prov: 'User Provided', // You can add more display names as needed
      tokens: 'Tokens'
    };
  
    function displayStock(stockValue) {
      return stockValue > 0 ? 'Yes' : 'No';
    }
  
    // Loop through the properties and display them in the details container
    propertyOrder.forEach(function (prop) {
      if (offerData[prop]) {
        var detailElement;
        var propName = propertyDisplayNames[prop] || prop; // Use the display name if available, or the original key name
        
        // Special handling for the "stock" property
        var propValue = prop === 'stock' ? displayStock(offerData[prop]) : offerData[prop];
        
        detailElement = $('<div class="detail"><strong>' + propName + ':</strong> ' + propValue + '</div>');
        offerDetails.append(detailElement);
      }
    });

    // Create a container for likes and dislikes
    var likesDislikesContainer = $('<div class="likes-dislikes" style="display: none;">');
    if (offerData.stock == 0) {
      likesDislikesContainer.addClass('disabled');
    }

    // Create the likes icon with data attribute for offer_id
    var thumbsUpIcon = $('<i class="fa fa-thumbs-up"></i>');
    thumbsUpIcon.attr('data-offer-id', offerId);

    // Create a span element for displaying likes count
    var likesCountElement = $('<span class="likes">' + offerData.likes + '</span>');

    // Append likes icon and count to the container
    likesDislikesContainer.append(thumbsUpIcon);
    likesDislikesContainer.append(likesCountElement);

    // Create the dislikes icon with data attribute for offer_id
    var thumbsDownIcon = $('<i class="fa fa-thumbs-down"></i>');
    thumbsDownIcon.attr('data-offer-id', offerId);

    // Create a span element for displaying dislikes count
    var dislikesCountElement = $('<span class="dislikes">' + offerData.dislikes + '</span>');

    // Append dislikes icon and count to the container
    likesDislikesContainer.append(thumbsDownIcon);
    likesDislikesContainer.append(dislikesCountElement);

    // Create the arrow icon for expanding/collapsing the offer details
    var arrowIcon = $('<i class="fa fa-chevron-right"></i>');
    offerEntry.append(arrowIcon);
    offerEntry.append(offerIdElement);
    offerEntry.append(offerDetails);

    // Create an image element with the 'offer-image' class and hide it initially
    var imageElement = $('<img class="offer-image" style="display: none;">');
    var imagePath = 'prod_images/' + offerData.image_path;
    imageElement.attr('src', imagePath);

    // Append the image element to the offer entry
    offerEntry.append(imageElement);
    offerEntry.append(likesDislikesContainer);

    // Event listener for clicking the arrow icon to expand/collapse the offer details
    arrowIcon.on('click', function () {
      offerDetails.toggle(); // Toggle the visibility of the offer details
      imageElement.toggle(); // Toggle the visibility of the image
      likesDislikesContainer.toggle(); // Toggle the visibility of the likes and dislikes container
      arrowIcon.toggleClass('fa-chevron-right fa-chevron-down'); // Toggle the arrow icon direction
    });

    // Event listener for clicking the thumbs-up icon (likes)
    thumbsUpIcon.on('click', function () {
      // Get the stock value
      var stockValue = offerData.stock;

      // If stock is greater than zero, handle the like event
      if (stockValue > 0) {
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
          },
          error: function (error) {
            console.error('Error updating likes:', error);
          }
        });
      }
    });

    // Event listener for clicking the thumbs-down icon (dislikes)
    thumbsDownIcon.on('click', function () {
      // Get the stock value
      var stockValue = offerData.stock;

      // If stock is greater than zero, handle the dislike event
      if (stockValue > 0) {
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
          },
          error: function (error) {
            console.error('Error updating dislikes:', error);
          }
        });
      }
    });

    return offerEntry;
  }

  // Get the container element to display the offer entries
  var offerContainer = $('#offer-container');

  // Create the offer entry for the markerData object
  var offerEntry = createOfferEntry(markerData);
  offerContainer.append(offerEntry);
});
