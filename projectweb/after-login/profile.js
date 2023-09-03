$(document).ready(function() {
$.ajax({
  url: 'get_profile.php',
  type: 'GET',
  dataType: 'json',
  success: function(userData) {
    // Assuming the response is an array with a single user object
    var user = userData[0];

    // Populate the form fields with user data
    var usernameField = document.getElementById("username");
    var emailField = document.getElementById("email");

    usernameField.value = user.username;
    emailField.value = user.email;
  }
});

$.ajax({
  url: "get_user_offers.php",
  method: "GET",
  dataType: "json",
  success: function(response) {
    const userOffersDiv = $("#user-offers");
    let offersHtml = "<ul>"; // Start a list

    // Loop through the offers and populate the offersHtml
    response.forEach(offer => {
      // Fetch the product information associated with the offer from the products table
      $.ajax({
        url: "get_product_info.php",
        method: "GET",
        data: { product_id: offer.product_id }, // Send the product_id to the PHP script
        dataType: "json",
        success: function(productResponse) {
          // Update the offersHtml with the product name and image
          offersHtml += "<li>";
          offersHtml += "<img src='prod_images/" + productResponse.image_path + "' alt='Product Image'>";
          offersHtml += "Product: " + productResponse.name + " - Discount: " + offer.discount;
          offersHtml += " Date: " + offer.date + " Likes: " + offer.likes + " Dislikes: " + offer.dislikes ;
          offersHtml += "</li>";
          userOffersDiv.html(offersHtml); // Set the HTML content
        },
        error: function(xhr, textStatus, errorThrown) {
          console.error("Error retrieving product information:", textStatus, errorThrown);
        }
      });
    });
  },
  error: function(xhr, textStatus, errorThrown) {
    console.error("Error retrieving user offers:", textStatus, errorThrown);
  }
});
// Retrieve and display user's likes
$.ajax({
  url: "get_user_likes.php",
  method: "GET",
  dataType: "json",
  success: function(response) {
    const userLikesDiv = $("#user-likes");
    let likesHtml = "<ul>"; // Start a list

    // Loop through the likes and populate the likesHtml
    response.forEach(like => {
      // Fetch the offer information associated with the like from the offers table
      $.ajax({
        url: "get_offer_info.php",
        method: "GET",
        data: { offer_id: like.offer_id }, // Send the offer_id to the PHP script
        dataType: "json",
        success: function(offerResponse) {
          $.ajax({
            url: "get_product_info.php",
            method: "GET",
            data: { product_id: offerResponse.product_id }, // Send the product_id to the PHP script
            dataType: "json",
            success: function(productResponse) {
              // Update the offersHtml with the product name and image
              likesHtml += "<li>";
              likesHtml += "<img src='prod_images/" + productResponse.image_path + "' alt='Product Image'>";
              likesHtml += "Product: " + productResponse.name + " - Discount: " + offerResponse.discount;
              likesHtml += " Date: " + offerResponse.date + " Likes: " + offerResponse.likes + " Dislikes: " + offerResponse.dislikes ;
              likesHtml += "</li>";
              userLikesDiv.html(likesHtml); // Set the HTML content

            },
            error: function(xhr, textStatus, errorThrown) {
              console.error("Error retrieving product information:", textStatus, errorThrown);
            }
          });


          
        },
        error: function(xhr, textStatus, errorThrown) {
          console.error("Error retrieving offer information:", textStatus, errorThrown);
        }
      });
    });

    likesHtml += "</ul>"; // Close the list
    userLikesDiv.html(likesHtml); // Set the HTML content
  },
  error: function(xhr, textStatus, errorThrown) {
    console.error("Error retrieving user likes:", textStatus, errorThrown);
  }
});

// Retrieve and display user's dislikes
$.ajax({
  url: "get_user_dislikes.php",
  method: "GET",
  dataType: "json",
  success: function(response) {
    const userDislikesDiv = $("#user-dislikes");
    let disLikesHtml = "<ul>"; // Start a list

    // Loop through the likes and populate the likesHtml
    response.forEach(like => {
      // Fetch the offer information associated with the like from the offers table
      $.ajax({
        url: "get_offer_info.php",
        method: "GET",
        data: { offer_id: like.offer_id }, // Send the offer_id to the PHP script
        dataType: "json",
        success: function(offerResponse) {
          $.ajax({
            url: "get_product_info.php",
            method: "GET",
            data: { product_id: offerResponse.product_id }, // Send the product_id to the PHP script
            dataType: "json",
            success: function(productResponse) {
              // Update the offersHtml with the product name and image
              disLikesHtml += "<li>";
              disLikesHtml += "<img src='prod_images/" + productResponse.image_path + "' alt='Product Image'>";
              disLikesHtml += "Product: " + productResponse.name + " - Discount: " + offerResponse.discount;
              disLikesHtml += " Date: " + offerResponse.date + " Likes: " + offerResponse.likes + " Dislikes: " + offerResponse.dislikes ;
              disLikesHtml += "</li>";
              userDislikesDiv.html(disLikesHtml); // Set the HTML content

            },
            error: function(xhr, textStatus, errorThrown) {
              console.error("Error retrieving product information:", textStatus, errorThrown);
            }
          });


          
        },
        error: function(xhr, textStatus, errorThrown) {
          console.error("Error retrieving offer information:", textStatus, errorThrown);
        }
      });
    });

    disLikesHtml += "</ul>"; // Close the list
    userDislikesDiv.html(disLikesHtml); // Set the HTML content
  },
  error: function(xhr, textStatus, errorThrown) {
    console.error("Error retrieving user likes:", textStatus, errorThrown);
  }
});

 // Retrieve and display user's score
 $.ajax({
  url: "get_user_score.php",
  method: "GET",
  dataType: "json",
  success: function(response) {
    const userScoreDiv = $("#user-score");
    userScoreDiv.text(response.score);
    const userMScoreDiv = $("#user-Mscore");
    userMScoreDiv.text(response.monthly_score);
  },
  error: function(xhr, textStatus, errorThrown) {
    console.error("Error retrieving user score:", textStatus, errorThrown);
  }
});
   // Retrieve and display user's tokens
   $.ajax({
    url: "get_user_tokens.php",
    method: "GET",
    dataType: "json",
    success: function(response) {
      const userTokensDiv = $("#user-tokens");
      userTokensDiv.text(response.tokens); // Assuming response contains the user's tokens
    },
    error: function(xhr, textStatus, errorThrown) {
      console.error("Error retrieving user tokens:", textStatus, errorThrown);
    }
  });
});
