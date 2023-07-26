$(document).ready(function() {
    // Access the markerData object from the newly opened window
    var markerData = window.markerData;
  
    // Function to create a single offer entry HTML element
    function createOfferEntry(offerData) {
      var offerId = offerData.offer_id;
  
      // Create the main offer ID element
      var offerEntry = $('<div class="offer-entry">');
      var offerIdElement = $('<div class="offer-id">' + offerId + '</div>');
      offerEntry.append(offerIdElement);
  
      // Create the arrow icon for expanding/collapsing the offer details
      var arrowIcon = $('<i class="fa fa-chevron-right"></i>');
      offerEntry.append(arrowIcon);
  
      // Create the details container for each offer
      var offerDetails = $('<div class="offer-details">');
  
      // Loop through the properties of the markerData and display them in the details container
      Object.keys(offerData).forEach(function(prop) {
        if (prop !== 'offer_id') {
          var detailElement = $('<div class="detail"><strong>' + prop + ':</strong> ' + offerData[prop] + '</div>');
          offerDetails.append(detailElement);
        }
      });
  
      // Append the details container to the offer entry
      offerEntry.append(offerDetails);
  
      // Event listener for clicking the arrow icon to expand/collapse the offer details
      arrowIcon.on('click', function() {
        offerDetails.toggle(); // Toggle the visibility of the offer details
        arrowIcon.toggleClass('fa-chevron-right fa-chevron-down'); // Toggle the arrow icon direction
      });
  
      return offerEntry;
    }
  
    // Get the container element to display the offer entries
    var offerContainer = $('#offer-container');
  
    // Create the offer entry for the markerData object
    var offerEntry = createOfferEntry(markerData);
    offerContainer.append(offerEntry);
  });
  