$(document).ready(function() {
  var urlParams = new URLSearchParams(window.location.search);
  var marketidParam = urlParams.get('marketid');
  var supermarketId = JSON.parse(marketidParam);

  function createOfferEntry(offerData) {
    var offerId = offerData.id;
    var offerEntry = $('<div class="offer-entry">');
    var offerIdElement = $('<div class="offer-id">' + offerId + '</div>');

    var offerDetails = $('<div class="offer-details">');

    var propertyOrder = ['poi_name', 'product_name', 'discount', 'date', 'stock', 'category_name', 'subcategory_name','user_username', 'user_tokens'];

    var propertyDisplayNames = {
      poi_name: 'Market',
      product_name: 'Product Name',
      discount: 'Discount (%)',
      date: 'Offer Date',
      stock: 'Stock',
      category_name: 'Category',
      subcategory_name: 'Subcategory',
      user_username: 'User Provided',
      user_tokens: 'Tokens'
    };
  
    function displayStock(stockValue) {
      return stockValue > 0 ? 'Yes' : 'No';
    }
  
    propertyOrder.forEach(function (prop) {
      var detailElement;
      var propName = propertyDisplayNames[prop] || prop; // Use the display name if available, or the original key name
    
      var propValue = prop === 'stock' ? displayStock(offerData[prop]) : offerData[prop];

      detailElement = $('<div class="detail"><strong>' + propName + ':</strong> ' + propValue + '</div>');
      offerDetails.append(detailElement);
    });
    
    var likesDislikesContainer = $('<div class="likes-dislikes" style="display: none;">');
    if (offerData.stock == 0) {
      likesDislikesContainer.addClass('disabled');
    }

    var thumbsUpIcon = $('<i class="fa fa-thumbs-up"></i>');
    thumbsUpIcon.attr('data-offer-id', offerId);

    var likesCountElement = $('<span class="likes">' + offerData.likes + '</span>');
    likesDislikesContainer.append(thumbsUpIcon);
    likesDislikesContainer.append(likesCountElement);

    var thumbsDownIcon = $('<i class="fa fa-thumbs-down"></i>');
    thumbsDownIcon.attr('data-offer-id', offerId);

    var dislikesCountElement = $('<span class="dislikes">' + offerData.dislikes + '</span>');
    likesDislikesContainer.append(thumbsDownIcon);
    likesDislikesContainer.append(dislikesCountElement);

    var arrowIcon = $('<i class="fa fa-chevron-right"></i>');

    var imageElement = $('<img class="offer-image">');
    var imagePath = 'prod_images/' + offerData.product_image;
    imageElement.attr('src', imagePath);

    var buttonContainer = $('<div class="button-container" style="display: none;">');

    var btnexistoffer = $('<button id="' + offerId + '"class="button1" >Offer Exists</button>');
    var btnnotexistoffer = $('<button id="' + offerId + '"class="button2" >Offer Doesn\'t Exist</button>');
    buttonContainer.append(btnexistoffer);
    buttonContainer.append(btnnotexistoffer);

    var leftContainer = $('<div class = left-offer-container></div>');
    leftContainer.append(imageElement);
    var centerContainer = $('<div class = center-offer-container></div>');
    centerContainer.append(offerIdElement);
    var rightContainer = $('<div class = right-offer-container></div>');
    rightContainer.append(arrowIcon);

    var expandContainer = $('<div class = expand-offer-container></div>');
    expandContainer.append(offerDetails, likesDislikesContainer, buttonContainer);

    offerEntry.append(leftContainer, centerContainer, rightContainer, expandContainer);

    // Event listener for clicking the arrow icon
    arrowIcon.on('click', function () {
      expandContainer.toggle(); // Toggle visibility
      likesDislikesContainer.toggle(); 
      buttonContainer.toggle();
      arrowIcon.toggleClass('fa-chevron-right fa-chevron-down');
    });

    // Event listener for like
    thumbsUpIcon.on('click', function () {
      var stockValue = offerData.stock;

      if (stockValue > 0) {
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
      }
    });

    // Event listener for dislikes
    thumbsDownIcon.on('click', function () {
      var stockValue = offerData.stock;

      if (stockValue > 0) {
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
      }
    });

    btnexistoffer.on('click', function(){
      
      var id = this.id;
      var type = 'add';
      $.ajax({
        url: "update_stock.php",
        method: "POST",
        data: {
          type: type,
          offerid: id
        },
        dataType: "json",
        success: function() {
          btnexistoffer.prop('disabled', true);
        },
        error: function(error) {
          console.error('Error fetching offer data:', error);
        }
      });

    });

    btnnotexistoffer.on('click', function(){
      
      var id = this.id;
      var type = 'remove';
      $.ajax({
        url: "update_stock.php",
        method: "POST",
        data: {
          type: type,
          offerid: id
        },
        dataType: "json",
        success: function() {
          btnnotexistoffer.prop('disabled', true);
        },
        error: function(error) {
          console.error('Error fetching offer data:', error);
        }
      });

    });



    return offerEntry;
  }

  var offerContainer = $('#offer-container');
  $.ajax({
    url: "get_offer_marketid.php",
    method: "GET",
    data: {
      marketid: supermarketId
    },
    dataType: "json",
    success: function(response) {
      var Offerdata = response;
      Offerdata.forEach(function(offerData) {
        var offerEntry = createOfferEntry(offerData);
        offerContainer.append(offerEntry);
      });
    },
    error: function(error) {
      console.error('Error fetching offer data:', error);
    }
  });

});
